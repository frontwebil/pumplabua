"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  resetVariant,
  setCurrentProduct,
} from "@/redux/pamplabua/slices/productPageSlice";
import { Product, Variant } from "@prisma/client";
import { ProductSafe } from "@/types/ProductSafe";

export function ProductPageInit({
  product,
}: {
  product: Product & { variants: Variant[] };
}) {
  const dispatch = useDispatch();

  useEffect(() => {
    const safeProduct: ProductSafe = {
      ...product,
      createdAt: product.createdAt.toISOString(),
      updatedAt: product.updatedAt.toISOString(),
    };

    dispatch(setCurrentProduct(safeProduct));
  }, [product, dispatch]);

  return null;
}
