"use client";

import "@/components/ProductPage/ProductPage.css";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import { Spinner } from "../Spinner/Spinner";
import { ProductPageImages } from "./ProductPageImages/ProductPageImages";
import { RootState } from "@/redux/pamplabua/store";
import { ProductPageInfo } from "./ProductPageInfo/ProductPageInfo";
import { ProductPageDescriptionInfo } from "./ProductPageInfo/ProductPageDescriptionInfo";

const TopSellers = dynamic(
  () =>
    import("../TopSellers/TopSellers").then((mod) => ({
      default: mod.TopSellers,
    })),
  { ssr: false }
);

export function ProductPageWrapper({ productId }: { productId: string }) {
  const { selectedVariant, currentProduct } = useSelector(
    (store: RootState) => store.productPageSlice
  );

  const isStaleProduct =
    !selectedVariant ||
    !currentProduct ||
    currentProduct.id !== productId;

  if (isStaleProduct)
    return (
      <div className="Spinner-container">
        <Spinner />
      </div>
    );

  return (
    <>
      <div className="product-page-wrapper">
        <ProductPageImages />
        <ProductPageInfo />
      </div>
      <ProductPageDescriptionInfo />
      <TopSellers />
    </>
  );
}
