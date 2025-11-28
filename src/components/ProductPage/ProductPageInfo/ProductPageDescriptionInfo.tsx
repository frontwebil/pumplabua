"use client";

import "@/components/ProductPage/ProductPageInfo/ProductPageInfo.css";
import { RootState } from "@/redux/pamplabua/store";
import { useSelector } from "react-redux";
import { useState } from "react";

export function ProductPageDescriptionInfo() {
  const { currentProduct } = useSelector(
    (store: RootState) => store.productPageSlice
  );

  const [isExpanded, setIsExpanded] = useState(false);

  if (!currentProduct?.description) return null;

  return (
    <div className="ProductPageDescriptionInfo">
      <div
        className={`ProductPageDescriptionInfo-content-text ${
          isExpanded ? "expanded" : "collapsed"
        }`}
        style={{ whiteSpace: "pre-wrap" }}
      >
        <span className="ProductPageDescriptionInfo-text">
          {currentProduct.description}
        </span>

        <button
          className="ProductPageDescriptionInfo-toggle"
          onClick={() => setIsExpanded((prev) => !prev)}
        >
          {isExpanded ? "Згорнути" : "Показати більше"}
        </button>
      </div>
    </div>
  );
}
