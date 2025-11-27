"use client";

import "@/components/AccountComponents/AccountComponents.css";
import { AccountNav } from "./AccountNav";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { toggleAuthModal } from "@/redux/pamplabua/slices/uiSlice";
import { useRouter } from "next/navigation";
import { Order, OrderItem } from "@prisma/client";

const ORDER_STATUS = {
  NEW: {
    label: "Нове замовлення",
    color: "#3B82F6",
  },
  PENDING: {
    label: "Очікує оплату",
    color: "#F59E0B",
  },
  PAID: {
    label: "Оплачено",
    color: "#22C55E",
  },
  CONFIRMED: {
    label: "Підтверджено",
    color: "#00A407",
  },
  SENDTORECEIVER: {
    label: "Відправлено",
    color: "#06B6D4",
  },
  DELIVERED: {
    label: "Доставлено",
    color: "#00A407",
  },
  FAILED: {
    label: "Помилка при оплаті",
    color: "#F44336",
  },
  CANCELED: {
    label: "Скасовано",
    color: "#F44336",
  },
} as const;

type OrderType = Order & { items: OrderItem[] };
type OrderStatusKey = keyof typeof ORDER_STATUS;

export function AccauntOrdersContent({ orders }: { orders: OrderType[] }) {
  const { status } = useSession();
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
  }, [dispatch, router, status]);

  console.log(orders);

  const formatDate = (date: string | Date) =>
    new Date(date).toLocaleDateString("uk-UA");

  return (
    <div className="container">
      <div className="account-content">
        <AccountNav />
        <div className="orders-history">
          <div className="orders-history-top"></div>
          <h2 className="fs-xl font-bold uppercase">Історія замовлень</h2>
          {orders.length > 0 ? (
            <div className="orders-history-content">
              <div className="orders-history-content-top">
                <div className="orders-history-content-top-block">Номер</div>
                <div className="orders-history-content-top-block">Дата</div>
                <div className="orders-history-content-top-block">Статус</div>
                <div className="orders-history-content-top-block-per-arrow"></div>
              </div>
              {orders.map((order) => {
                const id = order.orderRef?.slice(8, 14);
                const status =
                  ORDER_STATUS[order.status as OrderStatusKey] ||
                  ORDER_STATUS.NEW;
                console.log(status);
                return (
                  <div className="order-history-top" key={order.id}>
                    <div className="order-history-top-block">№{id}</div>
                    <div className="order-history-top-block">
                      {formatDate(order.createdAt)}
                    </div>
                    <div
                      className="order-history-top-block"
                      style={{
                        color: status.color,
                      }}
                    >
                      {status.label}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="nothing-in-history">Історія замовлень порожня</div>
          )}
        </div>
      </div>
    </div>
  );
}
