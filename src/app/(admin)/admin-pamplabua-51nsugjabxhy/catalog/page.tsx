"use client";

import { setProducts } from "@/redux/admin/slices/catalogSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdminCatalogRow } from "../../components/Catalog/Catalog";
import { RootState } from "@/redux/admin/store";
import { Product, Variant } from "@prisma/client";

export default function CatalogPage() {
  const dispatch = useDispatch();
  const { products } = useSelector((store: RootState) => store.catalogSlice);

  const getAllProducts = async () => {
    const res = await axios.get("/api/product/get-all");
    dispatch(setProducts(res.data));
  };

  useEffect(() => {
    getAllProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(products);

  return (
    <div className="mt-10 border border-gray-300 rounded-lg overflow-hidden">
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

      {products.length < 1
        ? ""
        : products.map((item: Product & { variants: Variant[] }) => (
            <AdminCatalogRow key={item.id} product={item} />
          ))}
    </div>
  );
}
