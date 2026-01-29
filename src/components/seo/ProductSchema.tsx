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
    product.variants.find((v:any) => v.isMain) ?? product.variants[0];

  const discount = mainVariant.discount ?? 0;

  const finalPrice =
    discount > 0
      ? Math.ceil(mainVariant.price - mainVariant.price * (discount / 100))
      : mainVariant.price;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",

    name: product.name,
    description: product.mainDescription,

    image: product.variants.flatMap((v:any) => v.images),

    sku: product.id,

    brand: {
      "@type": "Brand",
      name: product.brand || "PumpLab",
    },

    offers: {
      "@type": "Offer",

      url: `https://www.pumplabua.shop/product/${product.slug}`,
      priceCurrency: "UAH",
      price: finalPrice,

      availability: mainVariant.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",

      itemCondition: "https://schema.org/NewCondition",

      priceValidUntil: "2026-12-31",

      seller: {
        "@type": "Organization",
        name: "PumpLab UA",
      },

      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: 0,
          currency: "UAH",
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "UA",
        },
      },

      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        returnPolicyCategory:
          "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 14,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/FreeReturn",
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
