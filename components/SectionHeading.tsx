import { Reveal } from "./Reveal";

type Props = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
};

export function SectionHeading({ eyebrow, title, subtitle, align = "center" }: Props) {
  const alignment = align === "center" ? "mx-auto text-center items-center" : "items-start";
  return (
    <Reveal className={`flex max-w-2xl flex-col gap-4 ${alignment}`}>
      <span className="rounded-full border border-violet/30 bg-violet/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-lilac">
        {eyebrow}
      </span>
      <h2 className="font-display text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
        {title}
      </h2>
      {subtitle && <p className="text-base text-pretty text-muted sm:text-lg">{subtitle}</p>}
    </Reveal>
  );
}
