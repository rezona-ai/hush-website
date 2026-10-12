#!/usr/bin/env bash
# 为 hush-website 幂等创建 Global External Application LB，对外提供固定的全局静态 IP：
#   静态 IP -> HTTPS(托管证书) / HTTP(301 到 HTTPS) -> URL map -> backend service -> serverless NEG -> Cloud Run
# 由有权限的管理员在本地执行（使用本机 gcloud 登录身份），这样 GitHub Actions 的部署身份
# 不需要 LB、证书和 Cloud Run IAM 的写权限。重复执行是安全的；不修改 DNS。
# 前置条件：Deploy website to Cloud Run 工作流已至少成功运行一次（Cloud Run 服务已存在）。
#
# 用法：deploy/setup-lb.sh [--dry-run]
set -euo pipefail
dry_run=false
case "${1:-}" in
  "") ;;
  --dry-run) dry_run=true ;;
  *) echo "usage: $0 [--dry-run]" >&2; exit 2 ;;
esac

set -a; source "$(dirname "$0")/config.env"; set +a
project="$GCP_PROJECT_ID"; region="$GCP_REGION"
primary_domain="${SITE_URL#https://}"; primary_domain="${primary_domain%%/*}"
IFS=',' read -r -a domains <<< "$DOMAINS"
[[ ",$DOMAINS," == *",$primary_domain,"* ]] || { echo "DOMAINS must include the SITE_URL host $primary_domain" >&2; exit 1; }

gc() { if $dry_run; then echo "  + gcloud $* --project=$project"; else gcloud "$@" --project="$project" --quiet; fi; }
exists() { gcloud "$@" --project="$project" --format='value(name)' >/dev/null 2>&1; }

# ensure <label> <describe args...> -- <create args...>：存在则跳过，否则创建。
ensure() {
  local label="$1"; shift
  local describe=()
  while [[ "$1" != -- ]]; do describe+=("$1"); shift; done
  shift
  if exists "${describe[@]}"; then echo "exists $label"; else echo "create $label"; gc "$@"; fi
}

echo "hush-website load balancer: project=$project region=$region domains=$DOMAINS dry_run=$dry_run"
$dry_run || echo "running as $(gcloud config get-value account 2>/dev/null)"

# 1. Cloud Run 服务必须已存在、且只接受 LB 流量，然后才授予 allUsers 调用权限（外部仍只能经 LB 访问）。
gcloud run services describe "$SERVICE_NAME" --region="$region" --project="$project" --format='value(metadata.name)' >/dev/null \
  || { echo "Cloud Run service $SERVICE_NAME not found: run the deploy workflow first" >&2; exit 1; }
ingress="$(gcloud run services describe "$SERVICE_NAME" --region="$region" --project="$project" --format='value(metadata.annotations."run.googleapis.com/ingress")')"
[[ "$ingress" == internal-and-cloud-load-balancing ]] \
  || { echo "$SERVICE_NAME ingress is '$ingress'; refusing to make it public" >&2; exit 1; }
if gcloud run services get-iam-policy "$SERVICE_NAME" --region="$region" --project="$project" \
     --flatten='bindings[].members' --filter='bindings.role=roles/run.invoker AND bindings.members=allUsers' \
     --format='value(bindings.members)' 2>/dev/null | grep -qx allUsers; then
  echo "exists public invoker on $SERVICE_NAME"
else
  echo "grant public invoker on $SERVICE_NAME"
  gc run services add-iam-policy-binding "$SERVICE_NAME" --region="$region" --member=allUsers --role=roles/run.invoker
fi

# 2. 全局静态 IP 与 Google 托管证书（托管证书的域名不可修改，已存在但域名不同则拒绝继续）。
ensure "global address $LB_IP_NAME" compute addresses describe "$LB_IP_NAME" --global \
  -- compute addresses create "$LB_IP_NAME" --global --ip-version=IPV4
if exists compute ssl-certificates describe "$LB_CERT_NAME" --global; then
  cert_domains="$(gcloud compute ssl-certificates describe "$LB_CERT_NAME" --global --project="$project" --format='value(managed.domains)' | tr ';' ',')"
  [[ "$cert_domains" == "$DOMAINS" ]] || { echo "$LB_CERT_NAME is bound to '$cert_domains', not '$DOMAINS'; use a new LB_CERT_NAME" >&2; exit 1; }
fi
ensure "managed certificate $LB_CERT_NAME" compute ssl-certificates describe "$LB_CERT_NAME" --global \
  -- compute ssl-certificates create "$LB_CERT_NAME" --global --domains="$DOMAINS"

# 3. serverless NEG + backend service。
ensure "serverless NEG $LB_NEG" compute network-endpoint-groups describe "$LB_NEG" --region="$region" \
  -- compute network-endpoint-groups create "$LB_NEG" --region="$region" --network-endpoint-type=serverless --cloud-run-service="$SERVICE_NAME"
ensure "backend service $LB_BACKEND" compute backend-services describe "$LB_BACKEND" --global \
  -- compute backend-services create "$LB_BACKEND" --global --load-balancing-scheme=EXTERNAL_MANAGED
if gcloud compute backend-services describe "$LB_BACKEND" --global --project="$project" --format='value(backends[].group)' 2>/dev/null \
     | tr ';' '\n' | grep -q "/regions/$region/networkEndpointGroups/$LB_NEG$"; then
  echo "attached $LB_NEG -> $LB_BACKEND"
else
  echo "attach $LB_NEG -> $LB_BACKEND"
  gc compute backend-services add-backend "$LB_BACKEND" --global --network-endpoint-group="$LB_NEG" --network-endpoint-group-region="$region"
fi

# 4. URL map：主域名转发到 Cloud Run，其它域名 301 到主域名；HTTP 统一 301 到 HTTPS。
tmp="$(mktemp -d)"; trap 'rm -rf "$tmp"' EXIT
{
  echo "name: $LB_URL_MAP"
  echo "defaultService: https://www.googleapis.com/compute/v1/projects/$project/global/backendServices/$LB_BACKEND"
  aliases=()
  for d in "${domains[@]}"; do [[ "$d" == "$primary_domain" ]] || aliases+=("$d"); done
  if (( ${#aliases[@]} )); then
    echo "hostRules:"
    echo "- hosts: [$(IFS=,; echo "${aliases[*]}")]"
    echo "  pathMatcher: to-primary"
    echo "pathMatchers:"
    echo "- name: to-primary"
    echo "  defaultUrlRedirect: {hostRedirect: $primary_domain, httpsRedirect: true, stripQuery: false, redirectResponseCode: MOVED_PERMANENTLY_DEFAULT}"
  fi
} > "$tmp/url-map.yaml"
cat > "$tmp/redirect.yaml" <<YAML
name: $LB_REDIRECT_URL_MAP
defaultUrlRedirect: {httpsRedirect: true, stripQuery: false, redirectResponseCode: MOVED_PERMANENTLY_DEFAULT}
YAML
$dry_run && { echo "--- $LB_URL_MAP"; cat "$tmp/url-map.yaml"; }
echo "import url map $LB_URL_MAP"; gc compute url-maps import "$LB_URL_MAP" --global --source="$tmp/url-map.yaml"
echo "import url map $LB_REDIRECT_URL_MAP"; gc compute url-maps import "$LB_REDIRECT_URL_MAP" --global --source="$tmp/redirect.yaml"

# 5. 代理与转发规则：443 和 80 共用同一个静态 IP。
ensure "HTTPS proxy $LB_HTTPS_PROXY" compute target-https-proxies describe "$LB_HTTPS_PROXY" --global \
  -- compute target-https-proxies create "$LB_HTTPS_PROXY" --global --url-map="$LB_URL_MAP" --ssl-certificates="$LB_CERT_NAME"
ensure "HTTP proxy $LB_HTTP_PROXY" compute target-http-proxies describe "$LB_HTTP_PROXY" --global \
  -- compute target-http-proxies create "$LB_HTTP_PROXY" --global --url-map="$LB_REDIRECT_URL_MAP"
ensure "HTTPS forwarding rule $LB_HTTPS_RULE" compute forwarding-rules describe "$LB_HTTPS_RULE" --global \
  -- compute forwarding-rules create "$LB_HTTPS_RULE" --global --load-balancing-scheme=EXTERNAL_MANAGED --address="$LB_IP_NAME" --target-https-proxy="$LB_HTTPS_PROXY" --ports=443
ensure "HTTP forwarding rule $LB_HTTP_RULE" compute forwarding-rules describe "$LB_HTTP_RULE" --global \
  -- compute forwarding-rules create "$LB_HTTP_RULE" --global --load-balancing-scheme=EXTERNAL_MANAGED --address="$LB_IP_NAME" --target-http-proxy="$LB_HTTP_PROXY" --ports=80

if $dry_run; then exit 0; fi
address="$(gcloud compute addresses describe "$LB_IP_NAME" --global --project="$project" --format='value(address)')"
cert_status="$(gcloud compute ssl-certificates describe "$LB_CERT_NAME" --global --project="$project" --format='value(managed.status)')"
echo
echo "Static IP ($LB_IP_NAME): $address"
echo "Certificate ($LB_CERT_NAME): $cert_status"
echo "DNS: add these A records (remove any other A/AAAA/CNAME on the same names):"
for d in "${domains[@]}"; do echo "  $d  A  $address"; done
echo "The certificate turns ACTIVE only after every domain above resolves to this IP (usually 15-60 min)."
