/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { AdditionalInfo } from "@/app/(admin)/components/EditProduct/AdditionalInfo";
import { EditVariants } from "@/app/(admin)/components/EditProduct/EditVariants";
import { MainInfo } from "@/app/(admin)/components/EditProduct/MainInfo";
import ToggleActiveBestSeller from "@/app/(admin)/components/EditProduct/ToggleActiveBestSeller";
import { setActiveProduct } from "@/redux/admin/slices/EditProductSlice";
import { RootState } from "@/redux/admin/store";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function EditProduct() {
  const router = useRouter();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { product } = useSelector((store: RootState) => store.editProductSlice);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const getCurrentProduct = async () => {
    if (!id) return; // якщо id відсутній

    const res = await axios.get("/api/product/get-all");
    const { products } = res.data;

    // Знаходимо один продукт
    const currentProduct = products.find((el: any) => el.id === id);

    if (currentProduct) {
      dispatch(setActiveProduct(currentProduct));
    }
  };

  useEffect(() => {
    getCurrentProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, id]);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    try {
      await axios.post("/api/product/update", product);
      toast("Товар успішно оновлено!");
      router.replace("/admin-pamplabua-51nsugjabxhy/catalog");
    } catch (err) {
      console.error("Помилка при оновленні товару:", err);
      alert("Помилка при оновленні товару");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirmDelete) return;

    try {
      await axios.delete("/api/product/delete", {
        data: {
          id: product.id,
        },
      });

      toast.success("Товар успішно видалено");
      router.replace("/admin-pamplabua-51nsugjabxhy/catalog");
      router.refresh();
    } catch (error: any) {
      console.error("Помилка при видаленні:", error);
      toast.error(error?.response?.data?.error || "Помилка при видаленні");
    }
  };

  return (
    <div className="mt-10 mb-10">
      <form onSubmit={handleUpdate}>
        <h2 className="pb-10 text-xl font-bold">Редагування товару</h2>
        <ToggleActiveBestSeller />
        <MainInfo />
        <AdditionalInfo />
        <EditVariants />
        <div className="flex gap-10">
          <button
            className="
          mt-10
          px-5 py-2.5
          bg-blue-600 
          text-white 
          font-medium
          rounded
          shadow-sm
          hover:bg-blue-700 
          active:bg-blue-800
          transition-all 
          duration-200
          cursor-pointer
          "
            disabled={loading}
          >
            {loading ? "Змінюємо товар..." : "Змінити"}
          </button>
        </div>
      </form>
      <button
        className="
          mt-10
          px-5 py-2.5
          bg-red-600 
          text-white 
          font-medium
          rounded
          shadow-sm
          hover:bg-red-700 
          active:bg-red-800
          transition-all 
          duration-200
          cursor-pointer
          "
        disabled={loading}
        onClick={() => {
          setConfirmDelete(true);
          handleDelete();
        }}
      >
        {!confirmDelete ? "Видалити товар" : "Ви впевнені що хочете видалити?"}
      </button>
    </div>
  );
}
