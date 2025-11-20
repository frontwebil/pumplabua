import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import ProductSchema from "@/components/seo/ProductSchema";

export async function generateMetadata({ params }) {
  const product = await prisma.product.findFirst({
    where: { slug: params.slug },
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

export default async function ProductPage({ params }) {
  const product = await prisma.product.findFirst({
    where: { slug: params.slug },
    include: { variants: true },
  });

  if (!product) return notFound();

  const mainVariant =
    product.variants.find((v) => v.isMain) ?? product.variants[0];

  return (
    <div className="container product-page">
      {/* JSON-LD Schema.org */}
      <ProductSchema product={product} />

      <h1 className="product-title">{product.name}</h1>

      <div className="product-layout">
        <Image
          width={1000}
          height={500}
          src={mainVariant.images[0]}
          alt={product.name}
          className="product-image"
        />

        <div className="product-info">
          <p className="price">{mainVariant.price} грн</p>
          <p>{product.mainDescription}</p>
        </div>
      </div>
    </div>
  );
}
