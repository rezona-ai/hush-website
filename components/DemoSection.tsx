import type { Dictionary } from "@/lib/dictionaries";
import { ChatDemo } from "./ChatDemo";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function DemoSection({ dict }: { dict: Dictionary }) {
  return (
    <section id="demo" data-anchor="demo" className="relative overflow-hidden py-20 sm:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(138,56,245,0.18),transparent)]" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <SectionHeading eyebrow={dict.demo.eyebrow} title={dict.demo.title} subtitle={dict.demo.subtitle} align="left" />
        <Reveal delay={120}>
          <ChatDemo dict={dict.demo} ctaLabel={dict.nav.cta} />
        </Reveal>
      </div>
    </section>
  );
}
