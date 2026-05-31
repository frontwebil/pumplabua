"use client";

import { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { setCurrentProduct } from "@/redux/pamplabua/slices/productPageSlice";
import { Product, Variant } from "@prisma/client";
import { ProductSafe } from "@/types/ProductSafe";

export function ProductPageInit({
  product,
}: {
  product: Product & { variants: Variant[] };
}) {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const safeProduct: ProductSafe = {
      ...product,
      createdAt: product.createdAt.toISOString(),
      updatedAt: product.updatedAt.toISOString(),
    };

    dispatch(setCurrentProduct(safeProduct));
  }, [product.id, product, dispatch]);

  return null;
}
