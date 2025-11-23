import "@/components/FavoritesCatalog/FavoritesCatalog.css";
import { RootState } from "@/redux/pamplabua/store";
import { useSelector } from "react-redux";
import { Spinner } from "../Spinner/Spinner";
import { PiFaders } from "react-icons/pi";
import { ProductCard } from "../ProductCard/ProductCard";
import { IoIosArrowForward, IoMdHeartDislike } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import { Product, Variant } from "@prisma/client";

type ProductType = {
  variants: Variant[];
} & Product;

function getPrice(product: ProductType): number {
  if (!product.variants || product.variants.length === 0) return 0;

  const mainVariant = product.variants.filter((el) => el.isMain)[0];

  return mainVariant.price;
}

export function FavoritesCatalog() {
  const { favoritesProducts: favoritesProductsId } = useSelector(
    (store: RootState) => store.uiSlice
  );
  const { products } = useSelector((store: RootState) => store.productsSlice);
  const [isOpenSortMenu, setIsOpenSortMenu] = useState(false);
  const [sortType, setSortType] = useState<
    "recent" | "newest" | "oldest" | "priceLow" | "priceHigh"
  >("recent");
  const sortRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setIsOpenSortMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!favoritesProductsId || !products) {
    return (
      <div className="Spinner-container">
        <Spinner />
      </div>
    );
  }

  const favoritesProducts = products.filter((el) =>
    favoritesProductsId.includes(el.id)
  );

  const sortedProducts = [...favoritesProducts].sort((a, b) => {
    switch (sortType) {
      case "recent":
        const indexA = favoritesProductsId.indexOf(a.id);
        const indexB = favoritesProductsId.indexOf(b.id);
        return indexB - indexA;

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
    type: "recent" | "newest" | "oldest" | "priceLow" | "priceHigh"
  ) => {
    setSortType(type);
    setIsOpenSortMenu(false);
  };

  return (
    <div className="container">
      <div className="FavoritesCatalog-top">
        <div className="FavoritesCatalog-top-left-wrap">
          <h2 className="fs-xl uppercase font-bold">Збережено</h2>
          {favoritesProducts.length > 0 && (
            <p className="fs-sm" style={{ color: "#4F5052" }}>
              Показано {favoritesProducts.length}/{favoritesProducts.length}
            </p>
          )}
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
                    recent: "Нещодавно додано",
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
                    sortType === "recent" ? "actual" : ""
                  }`}
                  onClick={() => {
                    handleSortChange("recent");
                  }}
                >
                  Нещодавно додано
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
      {sortedProducts.length > 0 ? (
        <div className="FavoritesCatalog">
          {sortedProducts.map((el) => (
            <ProductCard product={el} key={el.id} />
          ))}
        </div>
      ) : (
        <div className="favorites-not-found">
          <IoMdHeartDislike />
          Немає улюблених товарів
        </div>
      )}
    </div>
  );
}
