"use client";

import { searchProduct } from "@/redux/pamplabua/slices/productsSlice";
import { RootState } from "@/redux/pamplabua/store";
import { useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { SearchCard } from "./SearchCard/SearchCard";

export function Search() {
  const { products, searchProducts } = useSelector(
    (store: RootState) => store.productsSlice,
  );
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    dispatch(searchProduct(searchTerm));
  }, [dispatch, searchTerm]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        dispatch(searchProduct(""));
      }
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
        <label className="search-icon" htmlFor="header-search">
          <CiSearch color="#4F5052" />
        </label>
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
