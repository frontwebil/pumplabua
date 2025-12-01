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

  const discount = mainVariant.discount ?? 0;
  const finalPrice =
    discount > 0
      ? Math.ceil(mainVariant.price - mainVariant.price * (discount / 100))
      : mainVariant.price;

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
      price: finalPrice,
      availability: mainVariant.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: `https://www.pumplabua.shop/product/${product.slug}`,

      ...(discount > 0 && {
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: finalPrice,
          priceCurrency: "UAH",
          referenceQuantity: {
            "@type": "QuantitativeValue",
            value: 1,
            unitText: "item",
          },
        },
      }),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
