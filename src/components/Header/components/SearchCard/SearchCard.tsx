import "@/components/Header/components/SearchCard/SearchCard.css";
import { searchProduct } from "@/redux/pamplabua/slices/productsSlice";
import { closeBurger } from "@/redux/pamplabua/slices/uiSlice";
import { Product, Variant } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";

type ProductType = {
  variants: Variant[];
} & Product;

export function SearchCard({ product }: { product: ProductType }) {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(searchProduct(""));
    dispatch(closeBurger());
  };

  const mainVariant = product.variants.filter((el) => el.isMain)[0];

  if (!mainVariant) return null;

  const price = mainVariant.price;
  const hasDiscount = mainVariant.discount! > 0;
  const mewPrice = hasDiscount
    ? Math.ceil(price - price * (mainVariant.discount! / 100))
    : price;

  return (
    <Link
      href={`/product/${product.slug}`}
      prefetch={false}
      onClick={() => handleClick()}
      className="SearchCard"
    >
      <div
        className={`search-card-img ${!product.isActive && "not-active-image"}`}
      >
        <Image
          src={mainVariant.images[0]}
          alt={product.name}
          width={90}
          height={90}
        />
      </div>
      <div
        className={`search-card-text ${
          !product.isActive && "not-active-product"
        }`}
      >
        <h3 className="search-card-text-title">{product.name}</h3>
        <p className="search-card-text-weight">
          <span className={`${product.isActive ? "active-product" : ""}`}>
            {product.isActive ? "У наявності" : "Немає в наявності"}
          </span>
        </p>
        <p className="search-card-text-price">
          <span className={`${hasDiscount && "price-with-discount"}`}>
            {mewPrice} грн
          </span>{" "}
          {hasDiscount && (
            <span className="old-price">{mainVariant.price} грн</span>
          )}
        </p>
      </div>
    </Link>
  );
}
