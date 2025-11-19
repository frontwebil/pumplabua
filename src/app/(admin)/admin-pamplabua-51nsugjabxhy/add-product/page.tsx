"use client";

import { useDispatch, useSelector } from "react-redux";
import { AdditionalInfo } from "../../components/AddProduct/AdditionalInfo";
import { MainInfo } from "../../components/AddProduct/MainInfo";
import { Variants } from "../../components/AddProduct/Variants";
import { RootState } from "@/redux/admin/store";
import ToggleActiveBestSeller from "../../components/AddProduct/ToggleActiveBestSeller";
import axios from "axios";
import { toast } from "react-toastify";
import React, { useState } from "react";
import { setDefaultValues } from "@/redux/admin/slices/addProductFormSlice";
import { useRouter } from "next/navigation";

export default function AddProductPage() {
  const {
    isActive,
    isBestseller,
    nameProduct,
    producer,
    mainDescription,
    description,
    category,
    features,
    purpose,
    components,
    additional,
    variants,
  } = useSelector((store: RootState) => store.addProductFormSlice);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const dispatch = useDispatch();

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    try {
      await axios.post("/api/product/create", {
        isActive,
        isBestseller,
        name: nameProduct,
        producer,
        mainDescription,
        description,
        category,
        features,
        purpose,
        components,
        additional,
        variants,
      });

      toast("Товар додано!");
      router.replace("/admin-pamplabua-51nsugjabxhy/catalog");
      dispatch(setDefaultValues());
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Помилка при створенні товару:", error);
      toast(
        error?.response?.data?.message || "Сталася помилка при створенні товару"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-10">
      <h1 className="mt-10 mb-5 font-bold text-xl">Створити новий продукт</h1>
      <form onSubmit={handleCreate}>
        <ToggleActiveBestSeller />
        <MainInfo />
        <AdditionalInfo />
        <Variants />
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
          {loading ? "Створюємо товар" : "Створити товар"}
        </button>
      </form>
    </div>
  );
}
