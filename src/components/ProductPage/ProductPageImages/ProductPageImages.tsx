"use client";

import "@/components/ProductPage/ProductPageImages/ProductPageImages.css";
import { RootState } from "@/redux/pamplabua/store";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export function ProductPageImages() {
  const { selectedVariant, currentProduct } = useSelector(
    (store: RootState) => store.productPageSlice
  );

  const [photoIndex, setPhotoIndex] = useState(0);
  const [isMainImageLoaded, setIsMainImageLoaded] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    setPhotoIndex(0);
    setIsMainImageLoaded(false);
  }, [selectedVariant?.id]);

  const currentPhoto = selectedVariant?.images[photoIndex] ?? "";

  if (!selectedVariant || !currentPhoto)
    return (
      <div className="ProductPageImages-container">
        <div className="ProductPageImages-nav">
          <div className={"smooth"}>
            <Image
              src={"/no-image.png"}
              alt={"Фото товару"}
              width={200}
              height={200}
              loading="eager"
            />
          </div>
        </div>

        <div className="ProductPageImages-mainImage">
          <Image
            src={"/no-image.png"}
            alt={"Фото товару"}
            width={1000}
            height={1000}
          />
        </div>
      </div>
    );

  return (
    <div className="ProductPageImages-container">
      <div className="ProductPageImages-nav">
        {selectedVariant.images.map((src, index) => (
          <div
            key={src}
            onClick={() => {
              setPhotoIndex(index);
              setIsMainImageLoaded(false);
            }}
            className={src === currentPhoto ? "" : "smooth"}
          >
            <Image
              src={src}
              alt={selectedVariant.flavor ?? "Фото товару"}
              width={200}
              height={200}
              loading={index === 0 ? "eager" : "lazy"}
              sizes="90px"
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
            {selectedVariant.inStock && currentProduct?.isActive
              ? "У наявності"
              : "Немає в наявності"}
          </div>
        </div>
        <div
          className="ProductPageImages-mainImage"
          onClick={() => setIsOpenModal(true)}
        >
          {!isMainImageLoaded && (
            <div className="ProductPageImages-mainImage-placeholder" />
          )}
          <Image
            key={`${selectedVariant.id}-${currentPhoto}`}
            src={currentPhoto}
            alt={selectedVariant.flavor ?? "Фото товару"}
            width={1000}
            height={1000}
            priority
            sizes="(max-width: 700px) 100vw, 530px"
            className={isMainImageLoaded ? "is-loaded" : "is-loading"}
            onLoad={() => setIsMainImageLoaded(true)}
          />
        </div>
      </div>
      {isOpenModal && (
        <div className="image-modal" onClick={() => setIsOpenModal(false)}>
          <Image
            width={1000}
            height={1000}
            src={currentPhoto}
            className="image-modal-content"
            alt="modal-image"
          />
        </div>
      )}
    </div>
  );
}
