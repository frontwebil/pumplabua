import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import ProductSchema from "@/components/seo/ProductSchema";
import { Breadcrumbs } from "@/components/Breadcrumbs/Breadcrumbs";
import { ProductPageInit } from "@/components/ProductPage/ProductPageInit";
import { ProductPageWrapper } from "@/components/ProductPage/ProductPageWrapper";

type ProductPageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata(props: ProductPageProps) {
  const { slug } = await props.params;

  const product = await prisma.product.findUnique({
    where: { slug },
    include: { variants: true },
  });

  if (!product) return { title: "Товар не знайдено" };

  return {
    title: `${product.name} — ціна, купити в Україні`,
    description: product.mainDescription,
    openGraph: {
      title: product.name,
      description: product.mainDescription,
      images: product.variants.flatMap((v) => v.images),
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

  // const mainVariant =
  //   product.variants.find((v) => v.isMain) ?? product.variants[0];

  return (
    <>
      <ProductSchema product={product} />
      <div className="container product-container">
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
