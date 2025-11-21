"use client";

import "@/components/ProductPage/ProductPage.css";
import { useSelector } from "react-redux";
import { Spinner } from "../Spinner/Spinner";
import { ProductPageImages } from "./ProductPageImages/ProductPageImages";
import { RootState } from "@/redux/pamplabua/store";
import { ProductPageInfo } from "./ProductPageInfo/ProductPageInfo";

export function ProductPageWrapper() {
  const { selectedVariant, currentProduct } = useSelector(
    (store: RootState) => store.productPageSlice
  );

  if (!selectedVariant || !currentProduct)
    return (
      <div className="Spinner-container">
        <Spinner />
      </div>
    );

  return (
    <div className="product-page-wrapper">
      <ProductPageImages />
      <ProductPageInfo />
    </div>
  );
}
