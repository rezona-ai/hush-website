import Link from "next/link";
import { Logo } from "@/components/Logo";

// Static export has no server-side redirects, so pick the locale in the browser:
// a saved choice wins, otherwise Chinese browsers go to /zh/ and everyone else to /en/.
const redirectScript = `
(function () {
  var locale = "en";
  try {
    var saved = localStorage.getItem("hush-locale");
    if (saved === "en" || saved === "zh") locale = saved;
    else if (/^zh\\b/i.test(navigator.language || "")) locale = "zh";
  } catch (e) {
    if (/^zh\\b/i.test(navigator.language || "")) locale = "zh";
  }
  location.replace("/" + locale + "/");
})();
`;

export default function RootRedirect() {
  return (
    <main className="grid min-h-dvh place-items-center bg-black">
      <script dangerouslySetInnerHTML={{ __html: redirectScript }} />
      <div className="flex flex-col items-center gap-6">
        <Logo size={40} />
        <div className="flex gap-3 text-sm">
          <Link href="/en/" className="rounded-full border border-line-strong px-4 py-2 hover:bg-white/10">
            English
          </Link>
          <Link href="/zh/" className="rounded-full border border-line-strong px-4 py-2 hover:bg-white/10">
            中文
          </Link>
        </div>
      </div>
    </main>
  );
}
