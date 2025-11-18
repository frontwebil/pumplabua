"use client";

import {
  setImages,
  reorderImages,
  clearImages,
} from "@/redux/admin/slices/addProductFormSlice";
import { RootState } from "@/redux/admin/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Image from "next/image";

export function ProductImageUploader() {
  const { files } = useSelector(
    (store: RootState) => store.addProductFormSlice
  );

  const dispatch = useDispatch();
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  useEffect(() => {
    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);

    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [files]);

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const list = e.target.files;
    console.log(list);
    if (!list || list.length === 0) return;

    const newFiles = Array.from(list);
    const combined = [...files, ...newFiles];
    dispatch(setImages(combined));
    // очистимо value щоб можна було вибрати ті ж файли повторно
    e.currentTarget.value = "";
  };

  const handleMoveLeft = (idx: number) => {
    if (idx === 0) return;
    const newFiles = [...files];
    [newFiles[idx - 1], newFiles[idx]] = [newFiles[idx], newFiles[idx - 1]];
    dispatch(reorderImages(newFiles));
  };

  const handleMoveRight = (idx: number) => {
    if (idx === files.length - 1) return;
    const newFiles = [...files];
    [newFiles[idx], newFiles[idx + 1]] = [newFiles[idx + 1], newFiles[idx]];
    dispatch(reorderImages(newFiles));
  };

  const handleRemove = (idx: number) => {
    const newFiles = files.filter((_, i) => i !== idx);
    dispatch(setImages(newFiles));
  };

  const handleClearAll = () => {
    dispatch(clearImages());
  };

  return (
    <div>
      <label className="inline-block mb-2">
        <input type="file" accept="image/*" multiple onChange={handleSelect} />
      </label>

      {files.length === 0 ? (
        <p className="text-sm text-gray-600">Фотки не вибрані</p>
      ) : (
        <>
          <p className="mb-2 text-sm text-gray-700">
            Перегляд — зміни порядок стрілками, потім натисни «Створити товар».
          </p>

          <div className="flex gap-3 flex-wrap">
            {files.map((f, idx) => (
              <div
                key={idx}
                className="border rounded p-2 relative flex flex-col items-center max-w-[250px]"
              >
                {/* preview: використовуємо objectURL */}
                <div className="overflow-hidden rounded">
                  {previewUrls[idx] ? (
                    <Image
                      src={previewUrls[idx]}
                      alt={f.name}
                      width={1000}
                      height={1000}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-40 bg-gray-100 animate-pulse rounded" />
                  )}
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
                    disabled={idx === files.length - 1}
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

                <div className="text-xs mt-1 text-center max-w-36 break-words">
                  {f.name}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={handleClearAll}
              className="px-4 py-2 border rounded text-sm"
            >
              Очистити
            </button>

            <div className="px-4 py-2 text-sm text-gray-600">
              Всього: {files.length}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
