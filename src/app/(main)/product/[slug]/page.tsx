import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import ProductSchema from "@/components/seo/ProductSchema";
import { Breadcrumbs } from "@/components/Breadcrumbs/Breadcrumbs";
import { ProductPageInit } from "@/components/ProductPage/ProductPageInit";
import { ProductPageWrapper } from "@/components/ProductPage/ProductPageWrapper";
import { ScrollTop } from "@/custom-hooks/scrollTop";

export const revalidate = 3600;

// 🔹 один fetch
async function getProduct(slug: string) {
  if (!slug) return null;

  try {
    const product = await prisma.product.findUnique({
      where: { slug },
      include: { variants: true },
    });

    // Если продукт не найден или нет вариантов — вернуть null
    if (!product || !product.variants?.length) return null;

    return product;
  } catch (err) {
    console.error("Prisma error for slug:", slug, err);
    return null;
  }
}

// 🔹 потрібен для SSG + sitemap
export async function generateStaticParams() {
  const products = await prisma.product.findMany({
    select: { slug: true },
  });

  return products.map((p: any) => ({
    slug: p.slug,
  }));
}

// 🔹 SEO
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;

  const product = await getProduct(slug);

  if (!product) {
    return {
      title: "Товар не знайдено",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const mainVariant =
    product.variants.find((v: any) => v.isMain) || product.variants[0];

  const mainImage = mainVariant?.images?.[0];

  return {
    title: `${product.name} — купити в Україні`,
    description: product.mainDescription,

    alternates: {
      canonical: `https://pumplabua.shop/product/${slug}`,
    },

    openGraph: {
      title: product.name,
      description: product.mainDescription,
      images: mainImage
        ? [
            {
              url: mainImage,
              width: 1200,
              height: 630,
              alt: product.name,
            },
          ]
        : [],
    },
  };
}

// 🔹 page
export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) return notFound();

  return (
    <>
      <ProductSchema product={product} />

      <div className="container product-container">
        <ScrollTop />

        <Breadcrumbs
          links={[
            { title: "Каталог", href: "/catalog" },
            {
              title: product.category,
              href: "/catalog",
              category: product.category,
            },
            { title: product.name },
          ]}
        />

        <ProductPageInit product={product} />
        <ProductPageWrapper />
      </div>
    </>
  );
}
