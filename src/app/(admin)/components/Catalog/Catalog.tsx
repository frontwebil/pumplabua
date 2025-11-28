"use client";

import { Spinner } from "@/components/Spinner/Spinner";
import { Product, Variant } from "@prisma/client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export function AdminCatalogRow({
  product,
}: {
  product: (Product & { variants: Variant[] }) | null;
}) {
  function formatDate(dateString: Date) {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}.${month} ${hours}:${minutes}`;
  }
  const router = useRouter();
  const [productState, setProductState] = useState(product);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  if (!productState || !product) return;

  const handleDelete = async () => {
    if (!confirmDelete) return;

    try {
      await axios.delete("/api/product/delete", {
        data: {
          id: product.id,
        },
      });

      toast.success("Товар успішно видалено");
      router.refresh();
      setProductState(null);
    } catch (error: any) {
      console.error("Помилка при видаленні:", error);
      toast.error(error?.response?.data?.error || "Помилка при видаленні");
    }
  };

  const handleChangeBestseller = async () => {
    if (loading || !productState) return;

    setLoading(true);

    const prevProduct = productState;
    const updatedProduct = {
      ...productState,
      isBestseller: !productState.isBestseller,
    };

    setProductState(updatedProduct);

    try {
      await axios.post("/api/product/update", updatedProduct);
      toast.success("Товар успішно оновлено!");
      router.refresh();
    } catch (err) {
      console.error("Помилка при оновленні товару:", err);
      toast.error("Помилка при оновленні товару");
      // 🔙 відкотити, якщо бекенд впав
      setProductState(prevProduct);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeActive = async () => {
    if (loading || !productState) return;

    setLoading(true);

    const prevProduct = productState;
    const updatedProduct = {
      ...productState,
      isActive: !productState.isActive,
    };

    setProductState(updatedProduct);

    try {
      await axios.post("/api/product/update", updatedProduct);
      toast.success("Товар успішно оновлено!");
      router.refresh();
    } catch (err) {
      console.error("Помилка при оновленні товару:", err);
      toast.error("Помилка при оновленні товару");
      setProductState(prevProduct);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-10 items-center p-3 border-b border-gray-200 text-sm">
      {/* НАЗВАНИЕ */}
      <div className="font-semibold">{product.name}</div>

      {/* ПРОИЗВОДИТЕЛЬ */}
      <div>{product.producer}</div>

      {/* КАТЕГОРИЯ */}
      <div className="capitalize">{product.category}</div>

      {/* ВАРИАНТЫ */}
      <div className="text-center">{product.variants.length || 0}</div>

      {/* АКТИВНОСТЬ */}
      <label className="flex items-center cursor-pointer select-none">
        <input
          type="checkbox"
          checked={productState.isActive}
          onChange={() => handleChangeActive()}
          className="sr-only" // ховаємо стандартний чекбокс
        />
        <div
          className={`
            w-10 h-5 flex items-center bg-gray-300 rounded-full p-1 
            transition-colors duration-300
            ${productState.isActive ? "bg-green-500" : "bg-gray-300"}
          `}
        >
          <div
            className={`
              bg-white w-4 h-4 rounded-full shadow-md transform 
              transition-transform duration-300
              ${productState.isActive ? "translate-x-5" : "translate-x-0"}
            `}
          />
        </div>
      </label>

      <label className="flex items-center cursor-pointer select-none">
        <input
          type="checkbox"
          checked={productState.isBestseller}
          onChange={() => handleChangeBestseller()}
          className="sr-only"
        />
        <div
          className={`
            w-10 h-5 flex items-center bg-gray-300 rounded-full p-1 
            transition-colors duration-300
            ${productState.isBestseller ? "bg-yellow-400" : "bg-gray-300"}
          `}
        >
          <div
            className={`
              bg-white w-4 h-4 rounded-full shadow-md transform 
              transition-transform duration-300
              ${productState.isBestseller ? "translate-x-5" : "translate-x-0"}
            `}
          />
        </div>
      </label>
      <div>{formatDate(product.updatedAt)}</div>
      <div>{formatDate(product.createdAt)}</div>

      {/* КНОПКА */}
      <Link
        href={`/admin-pamplabua-51nsugjabxhy/edit-product/${product.id}`}
        className="px-3 py-1 bg-blue-600 text-white rounded-md text-xs hover:bg-blue-700 transition text-center mr-1"
      >
        Edit
      </Link>
      <button
        className="px-3 py-1 bg-red-600 text-white rounded-md text-xs hover:bg-red-700 transition cursor-pointer ml-1"
        onClick={() => {
          handleDelete();
          setConfirmDelete(true);
        }}
      >
        {confirmDelete ? "Підтвердити" : "Видалити"}
      </button>
    </div>
  );
}
