import Image from "next/image";
import Link from "next/link";

/** Client-supplied ARP lockup (26 July 2026) — replaces the CSS-drawn wordmark. */
export function Logo() {
  return (
    <Link href="/" className="logo-mark" aria-label="Al Raed Pioneers home">
      <Image
        src="/assets/samples/logos/arp-lockup.png?v=2"
        alt=""
        width={683}
        height={137}
        priority
        unoptimized
        className="logo-lockup-img"
      />
    </Link>
  );
}
