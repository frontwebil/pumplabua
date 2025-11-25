"use client";

import { setProducts } from "@/redux/admin/slices/catalogSlice";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdminCatalogRow } from "../../components/Catalog/Catalog";
import { RootState } from "@/redux/admin/store";
import { Product, Variant } from "@prisma/client";
import { CATEGORYES } from "@/site-config/site.config";

export default function CatalogPage() {
  const dispatch = useDispatch();
  const { products } = useSelector((store: RootState) => store.catalogSlice);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const getAllProducts = async () => {
    const res = await axios.get("/api/product/get-all");
    dispatch(setProducts(res.data));
  };

  useEffect(() => {
    getAllProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((el) => el.category == selectedCategory);

  const searchedProducts = filteredProducts.filter((el) =>
    el.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="w-full max-w-full mt-10">
        <input
          type="text"
          placeholder="Пошук товарів..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="
        w-full px-4 py-2 pl-10
        bg-white border border-gray-300 rounded-lg
        text-sm focus:outline-none
        focus:border-blue-500 focus:ring-1 focus:ring-blue-500
        placeholder:text-gray-400
      "
        />
      </div>
      <div className="mt-10 border border-gray-300 rounded-lg overflow-hidden">
        <div className="flex flex-wrap gap-2.5 p-5">
          <div
            className={`
            px-4 py-2 rounded-full 
            bg-blue-100 
            text-sm font-semibold uppercase 
            cursor-pointer 
            hover:bg-blue-500 hover:text-white 
            ${selectedCategory === "All" ? "bg-blue-500 text-white" : ""}
            transition
            `}
            onClick={() => setSelectedCategory("All")}
          >
            Всі товари
          </div>
          {CATEGORYES.map((el) => (
            <div
              key={el.key}
              className={`
            px-4 py-2 rounded-full 
            bg-blue-100 
            text-sm font-semibold uppercase 
            cursor-pointer 
            hover:bg-blue-500 hover:text-white 
            ${selectedCategory === el.value ? "bg-blue-500 text-white" : ""}
            transition
      `}
              onClick={() => setSelectedCategory(el.value)}
            >
              {el.value}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-9 bg-gray-100 p-3 text-xs font-semibold text-gray-600 border-b">
          <div>Назва</div>
          <div>Виробник</div>
          <div>Категорія</div>
          <div className="text-center">Варіанти</div>
          <div>Статус</div>
          <div>Хіт продажу</div>
          <div>Змінений</div>
          <div>Створений</div>
          <div>Редагувати</div>
        </div>

        {searchedProducts.length === 0 ? (
          <div className="p-5 text-center text-gray-500">
            Нічого не знайдено
          </div>
        ) : (
          searchedProducts.map((item) => (
            <AdminCatalogRow key={item.id} product={item} />
          ))
        )}
      </div>
    </>
  );
}
