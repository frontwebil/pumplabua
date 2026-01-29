import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/dashboard", "/cart", "/checkout", "/profile"],
      },
    ],
    sitemap: "https://pumplabua.shop/sitemap.xml",
  };
}
