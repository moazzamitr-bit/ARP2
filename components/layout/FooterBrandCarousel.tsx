import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { footerBrandLogos } from "@/content/footer";

/** Static one-line brand strip; the logo list is trimmed to fit without scrolling. */
export function FooterBrandCarousel() {
  return (
    <div className="footer-brands-block">
      <p className="footer-brands-label">Our Brands</p>
      <div className="footer-logos">
        {footerBrandLogos.map((brand) => (
          <Link key={brand.name} href={brand.href} className="footer-logo-link" aria-label={brand.name}>
            <Image
              src={`${brand.src}?v=4`}
              alt=""
              width={160}
              height={48}
              unoptimized
              className="footer-logo-img"
              style={{ width: "auto", height: "auto", maxHeight: 30, background: "transparent" }}
            />
          </Link>
        ))}
        <Link href="/brands" className="footer-view-brands">
          View All Brands <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
