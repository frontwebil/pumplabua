import "@/components/CatalogCards/CatalogCards.css";
import { ProductCard } from "../ProductCard/ProductCard";
import { Spinner } from "../Spinner/Spinner";
import { Product, Variant } from "@prisma/client";
import { useRef, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { PiFaders } from "react-icons/pi";

type ProductType = {
  variants: Variant[];
} & Product;

function getPrice(product: ProductType): number {
  if (!product.variants || product.variants.length === 0) return 0;
  const mainVariant = product.variants.filter((el) => el.isMain)[0];
  return mainVariant.price;
}

export function CatalogCards({ products }: { products: ProductType[] }) {
  const [isOpenSortMenu, setIsOpenSortMenu] = useState(false);
  const [sortType, setSortType] = useState<
    "hits" | "newest" | "oldest" | "priceLow" | "priceHigh"
  >("hits");
  const sortRef = useRef<HTMLDivElement | null>(null);
  if (!products)
    return (
      <div className="Spinner-container">
        <Spinner />
      </div>
    );
  const sortedProducts = [...products].sort((a, b) => {
    switch (sortType) {
      case "hits":
        // хіти продажу: спочатку isBestseller = true
        return Number(b.isBestseller) - Number(a.isBestseller);

      case "newest":
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

      case "oldest":
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );

      case "priceLow":
        return getPrice(a) - getPrice(b);

      case "priceHigh":
        return getPrice(b) - getPrice(a);

      default:
        return 0;
    }
  });

  const handleSortChange = (
    type: "hits" | "newest" | "oldest" | "priceLow" | "priceHigh"
  ) => {
    setSortType(type);
    setIsOpenSortMenu(false);
  };
  return (
    <div className="catalog-cards-container">
      <div className="catalog-cards-container-top">
        <div className="catalog-cards-container-top-left">
          <h2 className="fs-xl font-bold uppercase">уся продукція</h2>
          <span className="fs-sm " style={{ color: "#4F5052" }}>
            Показано {products.length}/{products.length}
          </span>
        </div>
        <div className="Catalog-top-right-wrap">
          <div className="Catalog-top-right-wrap-sort-text">
            <PiFaders />
            <p>Сортувати:</p>
          </div>
          <div className="Catalog-top-right-wrap-sort-wrapper" ref={sortRef}>
            <div
              className="Catalog-top-right-wrap-sort-wrapper-text"
              onClick={() => setIsOpenSortMenu(!isOpenSortMenu)}
            >
              <p>
                {
                  {
                    hits: "Хіти продажу",
                    newest: "Найновіші",
                    oldest: "Найстаріші",
                    priceLow: "Ціна: від низької",
                    priceHigh: "Ціна: від високої",
                  }[sortType]
                }
              </p>
              <IoIosArrowForward />
            </div>
            {isOpenSortMenu && (
              <div className="Catalog-top-right-wrap-sort-wrapper-menu">
                <p
                  className={`Catalog-top-right-wrap-sort-wrapper-menu-button ${
                    sortType === "hits" ? "actual" : ""
                  }`}
                  onClick={() => {
                    handleSortChange("hits");
                  }}
                >
                  Хіти продажу
                </p>

                <p
                  className={`Catalog-top-right-wrap-sort-wrapper-menu-button ${
                    sortType === "newest" ? "actual" : ""
                  }`}
                  onClick={() => {
                    handleSortChange("newest");
                  }}
                >
                  Найновіші
                </p>

                <p
                  className={`Catalog-top-right-wrap-sort-wrapper-menu-button ${
                    sortType === "oldest" ? "actual" : ""
                  }`}
                  onClick={() => {
                    handleSortChange("oldest");
                  }}
                >
                  Найстаріші
                </p>

                <p
                  className={`Catalog-top-right-wrap-sort-wrapper-menu-button ${
                    sortType === "priceLow" ? "actual" : ""
                  }`}
                  onClick={() => {
                    handleSortChange("priceLow");
                  }}
                >
                  Ціна: Від низької до високої
                </p>

                <p
                  className={`Catalog-top-right-wrap-sort-wrapper-menu-button ${
                    sortType === "priceHigh" ? "actual" : ""
                  }`}
                  onClick={() => {
                    handleSortChange("priceHigh");
                  }}
                >
                  Ціна: Від високої до низької
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="catalog-cards">
        {sortedProducts
          ? sortedProducts.map((product: ProductType) => (
              <ProductCard key={product.id} product={product} />
            ))
          : products.map((product: ProductType) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </div>
    </div>
  );
}
