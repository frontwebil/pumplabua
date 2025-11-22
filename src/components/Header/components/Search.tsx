"use client";

import { searchProduct } from "@/redux/pamplabua/slices/productsSlice";
import { RootState } from "@/redux/pamplabua/store";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";

export function Search() {
  const { products , searchProducts } = useSelector((store: RootState) => store.productsSlice);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(searchProduct(searchTerm));
  }, [dispatch, searchTerm]);

  return (
    <>
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
      {/* <div className="search-list">
        {searchProducts.map((el)=>el.name)}
      </div> */}
    </>
  );
}
