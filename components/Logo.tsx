import Image from "next/image";
import cat from "@/public/images/cat.svg";

type Props = {
  className?: string;
  /** Height of the cat mark in px; the wordmark scales with it. */
  size?: number;
};

export function Logo({ className = "", size = 28 }: Props) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <Image src={cat} alt="" width={Math.round(size * 0.66)} height={size} priority />
      <span
        className="font-display font-semibold leading-none tracking-[-0.03em]"
        style={{ fontSize: size * 0.95 }}
      >
        Hush<span className="text-lilac">AI</span>
      </span>
    </span>
  );
}
