import { Product, Variant } from "@prisma/client";

type ProductWithVariants = Product & {
  variants: Variant[];
};
export default function ProductSchema({
  product,
}: {
  product: ProductWithVariants;
}) {
  const mainVariant =
    product.variants.find((v) => v.isMain) ?? product.variants[0];

  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    image: product.variants.flatMap((v) => v.images),
    description: product.mainDescription,
    brand: { "@type": "Brand", name: "Optimum Nutrition" },
    sku: product.id,
    offers: {
      "@type": "Offer",
      priceCurrency: "UAH",
      price: mainVariant.price,
      availability: "https://schema.org/InStock",
      url: `https://www.pumplabua.shop/product/${product.slug}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
