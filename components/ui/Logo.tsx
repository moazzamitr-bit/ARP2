import Image from "next/image";
import Link from "next/link";

/** Final ARP master lockup, shared by the header and footer. */
export function Logo() {
  return (
    <Link href="/" className="logo-mark" aria-label="Al Raed Pioneers home">
      <Image
        src="/assets/samples/logos/arp-lockup.png"
        alt="Al Raed Pioneers"
        width={683}
        height={137}
        priority
        unoptimized
        className="logo-lockup-img"
      />
    </Link>
  );
}
