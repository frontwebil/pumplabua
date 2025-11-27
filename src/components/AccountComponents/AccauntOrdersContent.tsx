"use client";

import "@/components/AccountComponents/AccountComponents.css";
import { AccountNav } from "./AccountNav";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { toggleAuthModal } from "@/redux/pamplabua/slices/uiSlice";

export function AccauntOrdersContent({ orders }: { orders: any }) {
  const { status } = useSession();
  console.log(status);
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    if (status === "unauthenticated") {
      toast(
        "Зареєструйтесь або ввійдіть в акаунт щоб бачити історію замовлень"
      );
      dispatch(toggleAuthModal());
      router.replace("/");
    }
  }, [status, orders]);

  return (
    <div className="container">
      <div className="account-content">
        <AccountNav />
        <div className="orders-history">
          <h2 className="fs-xl font-bold uppercase">Історія замовлень</h2>
          <div className="nothing-in-history">Історія замовлень порожня</div>
        </div>
      </div>
    </div>
  );
}
