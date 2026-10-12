import { notFound } from "next/navigation";
import { LegalPage } from "@/components/LegalPage";
import { getDictionary } from "@/lib/dictionaries";
import { hasLocale } from "@/lib/i18n";
import { getLegalDocument } from "@/lib/legal";
import { legalMetadata } from "@/lib/legal-route";

export async function generateMetadata({ params }: PageProps<"/[lang]/privacy">) {
  return legalMetadata((await params).lang, "privacy");
}

export default async function PrivacyPage({ params }: PageProps<"/[lang]/privacy">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const content = await getLegalDocument("privacy");
  return <LegalPage lang={lang} dict={getDictionary(lang)} doc="privacy" content={content} />;
}
