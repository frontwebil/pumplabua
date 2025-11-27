"use client";

import { resetOrder } from "@/redux/pamplabua/slices/orderSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export function ResetOrders() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetOrder());
  }, []);

  return <></>;
}
