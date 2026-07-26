import Link from "next/link";
import { brands } from "@/content/brands";
import { BrandLogo } from "@/components/brands/BrandLogo";

export function BrandRail() {
  return (
    <div className="brand-rail">
      {brands.map((brand) => (
        <Link key={brand.slug} href={`/brands/${brand.slug}`}>
          <BrandLogo text={brand.logoText} className={brand.logoClass} compact src={brand.logoSrc} />
        </Link>
      ))}
    </div>
  );
}
