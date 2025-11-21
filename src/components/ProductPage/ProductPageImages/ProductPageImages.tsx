"use client";

import "@/components/ProductPage/ProductPageImages/ProductPageImages.css";
import { RootState } from "@/redux/pamplabua/store";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export function ProductPageImages() {
  const { selectedVariant } = useSelector(
    (store: RootState) => store.productPageSlice
  );

  const [currentPhoto, setCurrentPhoto] = useState<string | null>(
    selectedVariant ? selectedVariant.images[0] : null
  );

  useEffect(() => {
    if (!selectedVariant) return;

    setCurrentPhoto(selectedVariant.images[0]);
  }, [selectedVariant?.id]);

  if (!selectedVariant || !currentPhoto) return null;

  return (
    <div className="ProductPageImages-container">
      <div className="ProductPageImages-nav">
        {selectedVariant.images.map((src) => (
          <div
            key={src}
            onClick={() => setCurrentPhoto(src)}
            className={src === currentPhoto ? "" : "smooth"}
          >
            <Image
              src={src}
              alt={selectedVariant.flavor!}
              width={200}
              height={200}
            />
          </div>
        ))}
      </div>

      <div className="ProductPageImages-mainImage">
        <div className="ProductPageImages-stickers">
          {selectedVariant.discount! > 0 && (
            <div className="ProductPageImages-sticker-discount">
              -{selectedVariant.discount}%
            </div>
          )}

          <div className="ProductPageImages-sticker-in-stock">
            {selectedVariant.inStock ? "У наявності" : "Немає в наявності"}
          </div>
        </div>

        <Image
          src={currentPhoto}
          alt={selectedVariant.flavor}
          width={1000}
          height={1000}
        />
      </div>
    </div>
  );
}
