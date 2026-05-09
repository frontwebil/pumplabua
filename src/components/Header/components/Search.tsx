"use client";

import { searchProduct } from "@/redux/pamplabua/slices/productsSlice";
import { RootState } from "@/redux/pamplabua/store";
import { useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { SearchCard } from "./SearchCard/SearchCard";

export function Search() {
  const { products, searchProducts } = useSelector(
    (store: RootState) => store.productsSlice,
  );
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    dispatch(searchProduct(searchTerm));
  }, [dispatch, searchTerm]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;

      if (containerRef.current?.contains(target)) return;

      const mobileSearchRoot = document.querySelector(
        "[data-header-mobile-search]",
      );
      if (mobileSearchRoot?.contains(target)) return;

      dispatch(searchProduct(""));
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dispatch]);

  return (
    <div className="header-search-input-container" ref={containerRef}>
      <form
        className="header-search-input-wrapper"
        role="search"
        aria-label="Пошук по сайту"
        onSubmit={(e) => {
          e.preventDefault();
          const q = searchTerm.trim();
          if (!q) return;
          dispatch(searchProduct(""));
          router.push(`/search?q=${encodeURIComponent(q)}`);
        }}
      >
        <input
          id="header-search"
          type="search"
          placeholder="Пошук"
          className="header-search-input fs-xs"
          disabled={products && products.length < 1}
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        <button
          type="submit"
          className="search-icon"
          aria-label="Шукати"
          disabled={products && products.length < 1}
        >
          <CiSearch color="#4F5052" />
        </button>
      </form>
      {searchProducts && searchProducts.length > 0 && (
        <div className="search-list">
          {searchProducts.map((el, i) => (
            <SearchCard product={el} key={i} />
          ))}
        </div>
      )}
    </div>
  );
}
