"use client";

import { useSelector } from "react-redux";
import { AdditionalInfo } from "../../components/AddProduct/AdditionalInfo";
import { ProductImageUploader } from "../../components/AddProduct/AddProductImage";
import { MainInfo } from "../../components/AddProduct/MainInfo";
import { Variants } from "../../components/AddProduct/Variants";
import { RootState } from "@/redux/admin/store";
import ToggleActiveBestSeller from "../../components/AddProduct/ToggleActiveBestSeller";
import axios from "axios";
import useUploadImages from "@/custom-hooks/useUploadImage";
import { toast } from "react-toastify";
import React, { useState } from "react";

export default function AddProductPage() {
  const { uploadImages } = useUploadImages();
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

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    const urls = await uploadImages();
    console.log(urls);
    if (urls.length < 1) {
      toast("Потрібно хоча б одне фото!");
      setLoading(false);
      return;
    }

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
      images: urls,
    });

    toast("Товар додано!");
    setLoading(false);
    return;
  };

  return (
    <div className="mb-10">
      <h1 className="mt-10 mb-5 font-bold text-xl">Створити новий продукт</h1>
      <form onSubmit={handleCreate}>
        <ToggleActiveBestSeller />
        <MainInfo />
        <AdditionalInfo />
        <Variants />
        <ProductImageUploader />
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
