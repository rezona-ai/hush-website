import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";

type Props = {
  /** A full-screen app screenshot. Omit to render custom `children` as the screen. */
  screen?: StaticImageData;
  alt?: string;
  className?: string;
  priority?: boolean;
  children?: ReactNode;
};

/**
 * iPhone-style bezel around a 390×844 app screen. Width and positioning are set via
 * `className` (no position class here, so callers can use `absolute`).
 */
export function PhoneFrame({ screen, alt = "", className = "", priority, children }: Props) {
  return (
    <div
      className={`aspect-[390/844] rounded-[13.5%/6.2%] bg-gradient-to-b from-zinc-600 via-zinc-800 to-zinc-700 p-[2.2%] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.06)] ${className}`}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[12%/5.6%] bg-black">
        {screen ? (
          <Image
            src={screen}
            alt={alt}
            fill
            sizes="(min-width: 1024px) 320px, 60vw"
            className="object-cover"
            // sync: a cached image paints in the same frame after a language switch,
            // instead of flashing the blur placeholder first.
            placeholder="blur"
            decoding="sync"
            priority={priority}
          />
        ) : (
          children
        )}
      </div>
    </div>
  );
}
