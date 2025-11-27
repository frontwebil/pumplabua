"use client";

import "@/components/AccountComponents/AccountComponents.css";
import { AccountNav } from "./AccountNav";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { toggleAuthModal } from "@/redux/pamplabua/slices/uiSlice";
import { useRouter } from "next/navigation";
import { Order, OrderItem } from "@prisma/client";
import { FaAngleDown } from "react-icons/fa";
import Image from "next/image";

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
    color: "#00A407",
  },
  CONFIRMED: {
    label: "Підтверджено",
    color: "#00A407",
  },
  SENDTORECEIVER: {
    label: "Відправлено",
    color: "#00A407",
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
  const [openOrderId, setOpenOrderId] = useState<string | null>(null);
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
                const id = order.orderRef?.slice(12, 21);
                const status =
                  ORDER_STATUS[order.status as OrderStatusKey] ||
                  ORDER_STATUS.NEW;

                return (
                  <div className="order-history-block-order" key={order.id}>
                    <div
                      className="order-history-top"
                      onClick={() =>
                        setOpenOrderId(
                          openOrderId === order.id ? null : order.id
                        )
                      }
                    >
                      <div className="order-history-top-block">№{id}</div>
                      <div className="order-history-top-block">
                        {formatDate(order.createdAt)}
                      </div>
                      <div
                        className="order-history-top-block status"
                        style={{
                          color: status.color,
                        }}
                      >
                        {status.label}
                      </div>
                      <div
                        className={`orders-history-content-top-block-per-arrow ${
                          openOrderId === order.id ? "open" : ""
                        }`}
                      >
                        <FaAngleDown />
                      </div>
                    </div>
                    {openOrderId === order.id && (
                      <div className="order-history-details">
                        {order.items.map((item, i) => (
                          <div className="order-history-details-row" key={i}>
                            <Image
                              src={item.images[0]}
                              width={60}
                              height={60}
                              alt={item.name}
                              className="order-item-image"
                            />

                            <div className="order-item-info">
                              <h3 className="order-item-title">{item.name}</h3>
                              <p className="order-item-producer">
                                {item.producer}
                              </p>
                            </div>

                            <div className="order-item-params">
                              <p>
                                <span>Смак:</span> {item.flavor || "—"}
                              </p>
                              <p>
                                {item.amount! > 0 ? item.amount : ""}{" "}
                                {item.sizeAmount} {item.unitType}
                              </p>
                            </div>

                            <div className="order-item-summary">
                              <p>
                                <span>К-сть:</span> {item.quantity}
                              </p>
                              <p className="order-item-price">
                                {Math.ceil(
                                  item.price -
                                    item.price * (item.discount! / 100)
                                ) * item.quantity}{" "}
                                грн
                              </p>
                            </div>
                          </div>
                        ))}
                        <div className="order-history-details-bottom">
                          {order.status === "NEW" ? (
                            <div className="cancel-order-account">
                              Скасувати
                            </div>
                          ) : (
                            <div></div>
                          )}
                          <div className="order-history-details-bottom-price">
                            Сумма: {order.totalPrice + order.deliveryPrice} грн
                          </div>
                        </div>
                      </div>
                    )}
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
