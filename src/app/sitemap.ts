import type { MetadataRoute } from "next";
import prisma from "@/lib/prisma";

export const revalidate = 43200; // 12 годин

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await prisma.product.findMany({
    where: {
      isActive: true,
    },
    select: {
      slug: true,
      updatedAt: true,
    },
  });

  return products.map((product) => ({
    url: `https://www.pumplabua.shop/product/${product.slug}`,
    lastModified: product.updatedAt,
    changeFrequency: "weekly",
    priority: 0.8,
  }));
}
