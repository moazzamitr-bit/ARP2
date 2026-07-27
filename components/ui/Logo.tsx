import Image from "next/image";
import Link from "next/link";

/** Final ARP master lockup, shared by the header and footer. */
export function Logo() {
  return (
    <Link href="/" className="logo-mark" aria-label="Al Raed Pioneers home">
      <Image
        src="/assets/samples/logos/arp-official.png?v=5"
        alt="Al Raed Pioneers"
        width={620}
        height={180}
        priority
        unoptimized
        className="logo-lockup-img"
      />
    </Link>
  );
}
