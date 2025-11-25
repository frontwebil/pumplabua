"use client";

import "@/components/CatalogCards/CatalogCards.css";
import { ProductCard } from "../ProductCard/ProductCard";
import { Spinner } from "../Spinner/Spinner";
import { Product, Variant } from "@prisma/client";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { PiFaders } from "react-icons/pi";
import { useRouter, useSearchParams } from "next/navigation";

type ProductType = Product & { variants: Variant[] };

function getPrice(product: ProductType): number {
  const mainVariant =
    product.variants.find((v) => v.isMain) || product.variants[0];
  return mainVariant.price;
}

export function CatalogCards({ products }: { products: ProductType[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isOpenSortMenu, setIsOpenSortMenu] = useState(false);
  const [sortType, setSortType] = useState<
    "hits" | "newest" | "oldest" | "priceLow" | "priceHigh"
  >("hits");

  const itemsPerPage = 15;

  const pageFromUrl = Number(searchParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(pageFromUrl);

  const sortRef = useRef<HTMLDivElement | null>(null);

  const isLoading = !products;

  // --- Синхронізація з URL при перезавантаженні ---
  useEffect(() => {
    const urlPage = Number(searchParams.get("page")) || 1;
    if (urlPage !== currentPage) {
      setCurrentPage(urlPage);
    }
  }, [searchParams]);

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

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirst, indexOfLast);
  const end = Math.min(indexOfLast, products.length);

  // ---------- Пагінація ----------
  function getPaginationRange(currentPage: number, totalPages: number) {
    const delta = 1;
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
    if (num < 1 || num > totalPages) return;
    setCurrentPage(num);
    router.replace(`?page=${num}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
                      setSortType("hits");
                      handlePageChange(1);
                      setIsOpenSortMenu(false);
                    }}
                  >
                    Хіти продажу
                  </p>

                  <p
                    className={`Catalog-top-right-wrap-sort-wrapper-menu-button ${
                      sortType === "newest" ? "actual" : ""
                    }`}
                    onClick={() => {
                      setSortType("newest");
                      handlePageChange(1);
                      setIsOpenSortMenu(false);
                    }}
                  >
                    Найновіші
                  </p>

                  <p
                    className={`Catalog-top-right-wrap-sort-wrapper-menu-button ${
                      sortType === "oldest" ? "actual" : ""
                    }`}
                    onClick={() => {
                      setSortType("oldest");
                      handlePageChange(1);
                      setIsOpenSortMenu(false);
                    }}
                  >
                    Найстаріші
                  </p>

                  <p
                    className={`Catalog-top-right-wrap-sort-wrapper-menu-button ${
                      sortType === "priceLow" ? "actual" : ""
                    }`}
                    onClick={() => {
                      setSortType("priceLow");
                      handlePageChange(1);
                      setIsOpenSortMenu(false);
                    }}
                  >
                    Ціна: Від низької до високої
                  </p>

                  <p
                    className={`Catalog-top-right-wrap-sort-wrapper-menu-button ${
                      sortType === "priceHigh" ? "actual" : ""
                    }`}
                    onClick={() => {
                      setSortType("priceHigh");
                      handlePageChange(1);
                      setIsOpenSortMenu(false);
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
        <button
          className="pagination-button"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <IoIosArrowBack />
          <p>Назад</p>
        </button>

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
