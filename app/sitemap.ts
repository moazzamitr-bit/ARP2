import type { MetadataRoute } from "next";
import { brands } from "@/content/brands";
import { newsArticles } from "@/content/news";
import { featuredProducts } from "@/content/products";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/brands",
    "/products",
    "/sports",
    "/solutions",
    "/wholesale",
    "/news",
    "/locations",
    "/authorized-resellers",
    "/faq",
    "/privacy",
    "/terms",
  ].map((path) => ({
    url: `${site.domain}${path}`,
    lastModified: new Date(),
  }));
  const brandRoutes = brands.flatMap((brand) => [
    { url: `${site.domain}/brands/${brand.slug}`, lastModified: new Date() },
    { url: `${site.domain}/brands/${brand.slug}/partnership`, lastModified: new Date() },
  ]);
  const productRoutes = featuredProducts.map((product) => ({
    url: `${site.domain}/brands/${product.brandSlug}/products/${product.slug}`,
    lastModified: new Date(),
  }));
  const newsRoutes = newsArticles.map((article) => ({
    url: `${site.domain}/news/${article.slug}`,
    lastModified: new Date(article.date),
  }));

  return [...staticRoutes, ...brandRoutes, ...productRoutes, ...newsRoutes];
}
