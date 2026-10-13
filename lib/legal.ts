import fs from "node:fs/promises";
import path from "node:path";

export const legalDocs = ["terms", "privacy"] as const;
export type LegalDoc = (typeof legalDocs)[number];

export type LegalSection = { id: string; title: string };

export type LegalDocument = {
  title: string;
  /** Provider / effective-date lines shown under the title. */
  meta: string[];
  /** Markdown for the body, without the title and meta block. */
  body: string;
  /** Top-level (##) sections, for the table of contents. */
  sections: LegalSection[];
};

/** Removes Markdown backslash escapes, e.g. `1\. The Service` → `1. The Service`. */
export const unescapeMarkdown = (text: string) => text.replace(/\\([\\`*_{}[\]()#+\-.!|<>~])/g, "$1");

/** Heading text → URL fragment, e.g. "5.2. What You Must Not Do" → "5-2-what-you-must-not-do". */
export const slugify = (text: string) =>
  unescapeMarkdown(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

/** Turns plain email addresses into mailto links. */
const linkEmails = (markdown: string) =>
  markdown.replace(/[\w.+-]+@[\w-]+(?:\\?\.[\w-]+)+/g, (match) => {
    const email = unescapeMarkdown(match);
    return `[${email}](mailto:${email})`;
  });

/**
 * Turns bare http(s) URLs into explicit links. Without this, GFM's autolinker keeps the
 * Markdown escapes in the target (`https://linkova\.net/` → `https://linkova%5C.net/`).
 */
const linkUrls = (markdown: string) =>
  markdown.replace(/https?:\/\/[^\s<>()]+/g, (match) => {
    const trailing = match.match(/(?:\\?[.,;:!?])+$/)?.[0] ?? "";
    const url = unescapeMarkdown(match.slice(0, match.length - trailing.length));
    return `[${url}](${url})${trailing}`;
  });

/**
 * Loads a legal document from content/legal at build time.
 *
 * The source files start with an internal, Chinese pre-publication checklist; only the
 * English text after the first `---` separator is public, per the documents' own notes.
 */
export async function getLegalDocument(doc: LegalDoc): Promise<LegalDocument> {
  const source = await fs.readFile(path.join(process.cwd(), "content/legal", `${doc}.md`), "utf8");
  const lines = source.replace(/\r\n/g, "\n").split("\n");

  const separator = lines.findIndex((line) => line.trim() === "---");
  if (separator === -1) throw new Error(`content/legal/${doc}.md has no "---" separator before the public text`);
  const publicLines = lines.slice(separator + 1);

  const titleIndex = publicLines.findIndex((line) => line.startsWith("# "));
  const title = unescapeMarkdown(publicLines[titleIndex].slice(2).trim());

  // The paragraph right after the title holds the provider and effective-date lines.
  let i = titleIndex + 1;
  while (i < publicLines.length && publicLines[i].trim() === "") i++;
  const meta: string[] = [];
  while (i < publicLines.length && publicLines[i].trim() !== "") {
    meta.push(unescapeMarkdown(publicLines[i].replace(/\*\*/g, "").trim()));
    i++;
  }

  const body = linkUrls(linkEmails(publicLines.slice(i).join("\n").trim()));
  const sections = body
    .split("\n")
    .filter((line) => line.startsWith("## "))
    .map((line) => {
      const text = line.slice(3).trim();
      return { id: slugify(text), title: unescapeMarkdown(text) };
    });

  return { title, meta, body, sections };
}
