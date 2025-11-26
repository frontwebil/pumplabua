"use client";

import "@/components/OrderCart/OrderCart.css";
import { toggleIsOpenOrderModal } from "@/redux/pamplabua/slices/uiSlice";
import { RootState } from "@/redux/pamplabua/store";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

export function OrderCart() {
  const [isMounted, setIsMounted] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { orderProducts } = useSelector(
    (store: RootState) => store.OrderProductsSlice
  );

  if (!isMounted) return null; // <--- ВАЖНО

  const productsInCart = orderProducts.reduce(
    (sum, item) => sum + item.quantityProduct,
    0
  );

  return (
    <div
      className="OrderCart-fixed-bottom-right"
      onClick={() => dispatch(toggleIsOpenOrderModal())}
    >
      <div className="OrderCart-fixed-container">
        <Image src={"/favicon.png"} alt="cart" width={100} height={100} />
        {orderProducts.length > 0 && (
          <div className="OrderCart-products-in-card">{productsInCart}</div>
        )}
      </div>
    </div>
  );
}
