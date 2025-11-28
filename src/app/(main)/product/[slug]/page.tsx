import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import ProductSchema from "@/components/seo/ProductSchema";
import { Breadcrumbs } from "@/components/Breadcrumbs/Breadcrumbs";
import { ProductPageInit } from "@/components/ProductPage/ProductPageInit";
import { ProductPageWrapper } from "@/components/ProductPage/ProductPageWrapper";
import { ScrollTop } from "@/custom-hooks/scrollTop";

type ProductPageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata(props: ProductPageProps) {
  const { slug } = props.params;

  const product = await prisma.product.findUnique({
    where: { slug },
    include: { variants: true },
  });

  if (!product) return { title: "Товар не знайдено" };

  // ✅ ИЩЕМ ГЛАВНЫЙ ВАРИАНТ
  const mainVariant =
    product.variants.find((v) => v.isMain) || product.variants[0];

  // ✅ ПЕРВОЕ ФОТО ГЛАВНОГО ВАРИАНТА
  const mainImage = mainVariant?.images[0];

  return {
    title: `${product.name} — ціна, купити в Україні`,
    description: product.mainDescription,
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

export default async function ProductPage(props: ProductPageProps) {
  const { slug } = await props.params;

  const product = await prisma.product.findUnique({
    where: { slug },
    include: { variants: true },
  });

  if (!product) return notFound();

  return (
    <>
      <ProductSchema product={product} />
      <div className="container product-container">
        <ScrollTop />
        <Breadcrumbs
          links={[
            { title: "Каталог", href: "/catalog" },
            { title: product.category, href: "/catalog" },
            { title: product.name },
          ]}
        />
        <ProductPageInit product={product} />
        <ProductPageWrapper />
      </div>
    </>
  );
}
