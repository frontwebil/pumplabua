"use client";

import "@/components/CatalogCards/CatalogCards.css";
import { ProductCard } from "../ProductCard/ProductCard";
import { Spinner } from "../Spinner/Spinner";
import { Product, Variant } from "@prisma/client";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { PiFaders } from "react-icons/pi";

type ProductType = Product & { variants: Variant[] };

function getPrice(product: ProductType): number {
  const mainVariant =
    product.variants.find((v) => v.isMain) || product.variants[0];
  return mainVariant.price;
}

export function CatalogCards({ products }: { products: ProductType[] }) {
  const [isOpenSortMenu, setIsOpenSortMenu] = useState(false);
  const [sortType, setSortType] = useState<
    "hits" | "newest" | "oldest" | "priceLow" | "priceHigh"
  >("hits");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const sortRef = useRef<HTMLDivElement | null>(null);

  const isLoading = !products;

  useEffect(() => {
    if (!products) return;
    const totalPages = Math.ceil(products.length / itemsPerPage);

    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [products?.length, currentPage]);

  if (isLoading)
    return (
      <div className="Spinner-container">
        <Spinner />
      </div>
    );

  // ---------- Сортування ----------
  const sortedProducts = [...products].sort((a, b) => {
    switch (sortType) {
      case "hits":
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
    setCurrentPage(1);
    setIsOpenSortMenu(false);
  };

  // ---------- Пагінація логіка ----------
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirst, indexOfLast);
  const end = Math.min(indexOfLast, products.length);

  // ---------- Генерація розумної пагінації ----------
  function getPaginationRange(currentPage: number, totalPages: number) {
    const delta = 1; // кількість кнопок навколо активної
    const range = [];
    const rangeWithDots: (number | string)[] = [];

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        range.push(i);
      }
    }

    let prev: number | null = null;
    for (let i of range) {
      if (prev !== null) {
        if (i - prev === 2) {
          rangeWithDots.push(prev + 1);
        } else if (i - prev > 2) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(i);
      prev = i;
    }

    return rangeWithDots;
  }

  const pagination = getPaginationRange(currentPage, totalPages);

  const handlePageChange = (num: number) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (num < 1 || num > totalPages) return;
    setCurrentPage(num);
  };

  return (
    <div className="catalog-cards-container">
      <div className="catalog-cards-container-top">
        <div className="catalog-cards-container-top-left">
          <h2 className="fs-xl font-bold uppercase">уся продукція</h2>
          <span className="fs-sm" style={{ color: "#4F5052" }}>
            Показано {end} / {products.length}
          </span>
        </div>

        <div className="Catalog-top-right-wrap-container">
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
                      handlePageChange(1);
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
                      handlePageChange(1);
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
                      handlePageChange(1);
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
                      handlePageChange(1);
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
                      handlePageChange(1);
                    }}
                  >
                    Ціна: Від високої до низької
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="Filter-mobile-button">
            <PiFaders />
          </div>
        </div>
      </div>

      {/* PRODUCTS */}
      <div className="catalog-cards">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* PAGINATION */}
      <div className="pagination">
        {/* ← Prev */}
        <button
          className="pagination-button"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <IoIosArrowBack />
          <p>Назад</p>
        </button>

        {/* Pages */}
        <div>
          {pagination.map((item, i) =>
            item === "..." ? (
              <span key={i} className="dots">
                ...
              </span>
            ) : (
              <button
                key={i}
                className={currentPage === item ? "active" : ""}
                onClick={() => handlePageChange(item as number)}
              >
                {item}
              </button>
            )
          )}
        </div>

        {/* Next → */}
        <button
          className="pagination-button"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <p>Далі</p>
          <IoIosArrowForward />
        </button>
      </div>
    </div>
  );
}
