import type { ComponentProps } from "react";
import Markdown, { type Components } from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import { slugify } from "@/lib/legal";

type HastNode = { type: string; value?: string; children?: HastNode[] };

const textOf = (node?: HastNode): string =>
  !node ? "" : node.type === "text" ? (node.value ?? "") : (node.children ?? []).map(textOf).join("");

const components: Components = {
  h2: ({ node, children }) => {
    const id = slugify(textOf(node as HastNode));
    return (
      <h2
        id={id}
        data-anchor={id}
        className="mt-14 border-t border-line pt-10 font-display text-2xl font-semibold tracking-tight text-white first:mt-0 first:border-0 first:pt-0"
      >
        {children}
      </h2>
    );
  },
  h3: ({ node, children }) => {
    const id = slugify(textOf(node as HastNode));
    return (
      <h3 id={id} data-anchor={id} className="mt-9 text-lg font-semibold text-white">
        {children}
      </h3>
    );
  },
  p: ({ children }) => <p className="mt-4 leading-[1.8] text-zinc-300">{children}</p>,
  ul: ({ children }) => (
    <ul className="mt-4 flex list-disc flex-col gap-2 pl-5 text-zinc-300 marker:text-violet">{children}</ul>
  ),
  li: ({ children }) => <li className="pl-1 leading-[1.8] [&>p]:mt-0">{children}</li>,
  strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
  a: ({ href, children }) => (
    <a href={href} className="text-lilac underline decoration-lilac/40 underline-offset-4 transition hover:decoration-lilac">
      {children}
    </a>
  ),
  table: ({ children }) => (
    <div className="mt-6 overflow-x-auto rounded-2xl border border-line">
      <table className="w-full min-w-[560px] border-collapse text-left text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-white/[0.04] text-white">{children}</thead>,
  th: ({ children }) => <th className="border-b border-line px-4 py-3 font-semibold">{children}</th>,
  td: ({ children }) => <td className="border-b border-line px-4 py-3 align-top text-zinc-300">{children}</td>,
  hr: () => <hr className="my-10 border-line" />,
};

/** Renders a legal document's Markdown body with the site's long-form typography. */
export function LegalArticle({ markdown, ...props }: { markdown: string } & ComponentProps<"article">) {
  return (
    <article {...props}>
      <Markdown remarkPlugins={[remarkGfm, remarkBreaks]} components={components}>
        {markdown}
      </Markdown>
    </article>
  );
}
