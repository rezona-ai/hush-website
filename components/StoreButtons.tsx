import type { Dictionary } from "@/lib/dictionaries";

// TODO: replace with real store listing URLs once the app is published.
const APP_STORE_URL = "#download";
const GOOGLE_PLAY_URL = "#download";

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-6 fill-current">
      <path d="M16.37 12.6c-.02-2.2 1.8-3.26 1.88-3.31-1.02-1.5-2.62-1.7-3.19-1.72-1.36-.14-2.65.8-3.34.8-.69 0-1.75-.78-2.88-.76-1.48.02-2.85.86-3.61 2.19-1.54 2.67-.39 6.62 1.11 8.79.73 1.06 1.6 2.25 2.75 2.2 1.1-.04 1.52-.71 2.85-.71 1.33 0 1.71.71 2.88.69 1.19-.02 1.94-1.08 2.67-2.14.84-1.23 1.19-2.42 1.21-2.48-.03-.01-2.32-.89-2.33-3.55ZM14.18 6.13c.61-.74 1.02-1.76.91-2.78-.88.04-1.94.58-2.57 1.32-.56.65-1.06 1.7-.93 2.7.98.08 1.98-.5 2.59-1.24Z" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-6">
      <path fill="#34A853" d="M3.6 2.3 13.4 12l-9.8 9.7c-.35-.2-.6-.6-.6-1.1V3.4c0-.5.25-.9.6-1.1Z" />
      <path fill="#FBBC04" d="m16.8 8.6-3.4 3.4 3.4 3.4 3.8-2.2c.9-.5.9-1.8 0-2.3l-3.8-2.3Z" />
      <path fill="#4285F4" d="M3.6 2.3c.36-.2.82-.22 1.25.03l11.95 6.27-3.4 3.4L3.6 2.3Z" />
      <path fill="#EA4335" d="m13.4 12 3.4 3.4-11.95 6.27c-.43.25-.89.23-1.25.03L13.4 12Z" />
    </svg>
  );
}

export function StoreButtons({ dict, className = "" }: { dict: Dictionary["store"]; className?: string }) {
  const base =
    "group inline-flex h-14 items-center gap-3 rounded-2xl px-5 transition duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet";
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <a href={APP_STORE_URL} className={`${base} bg-white text-black hover:bg-zinc-100`}>
        <AppleIcon />
        <span className="flex flex-col text-left leading-tight">
          <span className="text-[11px] opacity-70">{dict.appStoreTop}</span>
          <span className="text-[17px] font-semibold">{dict.appStore}</span>
        </span>
      </a>
      <a href={GOOGLE_PLAY_URL} className={`${base} glass text-white hover:bg-white/15`}>
        <PlayIcon />
        <span className="flex flex-col text-left leading-tight">
          <span className="text-[11px] opacity-70">{dict.googlePlayTop}</span>
          <span className="text-[17px] font-semibold">{dict.googlePlay}</span>
        </span>
      </a>
    </div>
  );
}
