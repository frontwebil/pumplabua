import "@/components/ProductCard/ProductCard.css";
import { Product, Variant } from "@prisma/client";
import Image from "next/image";
import { AddToFavorites } from "./AddToFavorites";
import Link from "next/link";

type ProductType = {
  variants: Variant[];
} & Product;

export function ProductCard({ product }: { product: ProductType }) {
  const mainVariant = product.variants.find((el) => el.isMain);

  if (!mainVariant) return null;

  const hasDiscount = mainVariant.discount && mainVariant.discount > 0;
  const oldPrice = mainVariant.price;
  const newPrice = hasDiscount
    ? Math.ceil(oldPrice - oldPrice * (mainVariant.discount! / 100))
    : oldPrice;

  const imageSrc =
    mainVariant.images && mainVariant.images.length > 0
      ? mainVariant.images[0]
      : "/no-image.png"; // свій плейсхолдер

  return (
    <Link href={`/product/${product.slug}`} className="product-card">
      {mainVariant.discount! > 0 && (
        <div className="discount-block">-{mainVariant.discount}%</div>
      )}
      <AddToFavorites productId={product.id} />
      <div>
        <Image src={imageSrc} alt={product.name} width={200} height={200} />
        <p className="product-card-category">{product.category}</p>
        <h2 className="product-card-title">{product.name}</h2>
      </div>
      <div className="product-card-price-wrapper">
        {hasDiscount ? (
          <>
            <h3 className="product-card-price">{newPrice} грн</h3>
            <h3 className="product-card-price old">{oldPrice} грн</h3>
          </>
        ) : (
          <h3 className="product-card-price">{oldPrice} грн</h3>
        )}
      </div>
    </Link>
  );
}
