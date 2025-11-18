"use client";

import {
  addImage,
  removeImage,
  reorderImages,
} from "@/redux/admin/slices/EditProductSlice";
import { RootState } from "@/redux/admin/store";
import axios from "axios";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";

export function EditProductImages({
  loading,
  setLoading,
}: {
  loading: boolean;
  setLoading: (value: boolean) => void;
}) {
  const dispatch = useDispatch();
  const { product } = useSelector((store: RootState) => store.editProductSlice);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    if (loading) return;

    setLoading(true);

    const formData = new FormData();
    for (const file of e.target.files) {
      formData.append("images", file);
    }

    // Зберігаємо посилання на input до async операції
    const inputElement = e.currentTarget;

    try {
      const { data } = await axios.post("/api/upload-images", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (data.urls && data.urls.length > 0) {
        data.urls.forEach((url: string) => dispatch(addImage(url)));
      }
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setLoading(false);
    }

    // Очистимо value щоб можна було вибрати ті ж файли повторно
    inputElement.value = "";
  };

  const handleMoveLeft = (idx: number) => {
    if (idx === 0) return;
    const newImages = [...product.images];
    [newImages[idx - 1], newImages[idx]] = [newImages[idx], newImages[idx - 1]];
    dispatch(reorderImages(newImages));
  };

  const handleMoveRight = (idx: number) => {
    if (idx === product.images.length - 1) return;
    const newImages = [...product.images];
    [newImages[idx], newImages[idx + 1]] = [newImages[idx + 1], newImages[idx]];
    dispatch(reorderImages(newImages));
  };

  const handleRemove = (idx: number) => {
    dispatch(removeImage(idx));
  };

  return (
    <div>
      <label className="inline-block mb-2">
        <input
          disabled={loading}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileUpload}
        />
      </label>

      {product.images.length === 0 ? (
        <p className="text-sm text-gray-600">Фотки не вибрані</p>
      ) : (
        <>
          <p className="mb-2 text-sm text-gray-700">
            Перегляд — зміни порядок стрілками.
          </p>

          <div className="flex gap-3 flex-wrap">
            {product.images.map((url, idx) => (
              <div
                key={idx}
                className="border rounded p-2 relative flex flex-col justify-between items-center max-w-[250px]"
              >
                {/* preview */}
                <div className="overflow-hidden rounded">
                  <Image
                    src={url}
                    alt={`Image ${idx + 1}`}
                    width={1000}
                    height={300}
                    className="w-full h-full object-cover max-h-[300px]"
                  />
                </div>

                <div className="mt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleMoveLeft(idx)}
                    disabled={idx === 0}
                    className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
                  >
                    ←
                  </button>

                  <button
                    type="button"
                    onClick={() => handleMoveRight(idx)}
                    disabled={idx === product.images.length - 1}
                    className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
                  >
                    →
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRemove(idx)}
                    className="px-2 py-1 bg-red-500 text-white rounded"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex gap-2">
            <div className="px-4 py-2 text-sm text-gray-600">
              Всього: {product.images.length}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
