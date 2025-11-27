"use client";

import { Order, OrderItem } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type TypeOrder = Order & {
  items: OrderItem[];
};

const STATUS_CONFIG = {
  NEW: { label: "Новий", color: "#2f6aff" },
  PENDING: { label: "Очікує оплату", color: "#f0ad4e" },
  PAID: { label: "Оплачено", color: "#22c55e" },
  CONFIRMED: { label: "Підтверджено", color: "#4f46e5" },
  SENDTORECEIVER: { label: "Відправлено", color: "#0ea5e9" },
  DELIVERED: { label: "Доставлено", color: "#16a34a" },
  FAILED: { label: "Помилка", color: "#ef4444" },
  CANCELED: { label: "Скасовано", color: "#9ca3af" },
} as const;

export default function AdminOrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<TypeOrder[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/get-orders")
      .then((res) => res.json())
      .then(setOrders)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Завантаження...</p>;

  return (
    <div style={{ padding: "40px", minHeight: "100vh" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        {Object.entries(STATUS_CONFIG).map(([key, config]) => {
          const active = selectedStatuses.includes(key);

          return (
            <button
              key={key}
              className={`filter-btn ${active ? "active" : ""}`}
              style={{
                background: active ? config.color : "#f4f6ff",
                color: active ? "white" : "#2c3e70",
                border: "1px solid #dbe3ff",
                padding: "6px 12px",
                borderRadius: "999px",
                fontSize: "12px",
                cursor: "pointer",
              }}
              onClick={() => {
                setSelectedStatuses((prev) =>
                  prev.includes(key)
                    ? prev.filter((s) => s !== key)
                    : [...prev, key]
                );
              }}
            >
              {config.label}
            </button>
          );
        })}

        {selectedStatuses.length > 0 && (
          <button
            onClick={() => setSelectedStatuses([])}
            style={{
              background: "#f1f3ff",
              color: "#4b5ed7",
              border: "1px dashed #c7d2ff",
              padding: "6px 12px",
              borderRadius: "999px",
              fontSize: "12px",
              cursor: "pointer",
            }}
          >
            Очистити
          </button>
        )}
      </div>
      <h1 style={{ fontSize: "26px", fontWeight: 700, marginBottom: "20px" }}>
        Замовлення
      </h1>

      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            background: "#fff",
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 10px 25px rgba(0,0,0,.05)",
          }}
        >
          <thead style={{ background: "#f1f4ff" }}>
            <tr>
              {["#", "Номер", "Товари", "Сума", "Статус", "Дата"].map(
                (title) => (
                  <th
                    key={title}
                    style={{
                      textAlign: "left",
                      padding: "14px 16px",
                      fontSize: "13px",
                      color: "#5b6b91",
                      fontWeight: 600,
                    }}
                  >
                    {title}
                  </th>
                )
              )}
            </tr>
          </thead>

          <tbody>
            {orders
              .filter(
                (order) =>
                  selectedStatuses.length === 0 ||
                  selectedStatuses.includes(order.status)
              )
              .map((order, index) => {
                const status = STATUS_CONFIG[order.status];
                const itemsCount = order.items.reduce(
                  (sum, el) => (sum += el.quantity),
                  0
                );

                return (
                  <tr
                    key={order.id}
                    style={{
                      borderBottom: "1px solid #f0f2f8",
                      transition: "0.15s",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      router.push(
                        `/admin-pamplabua-51nsugjabxhy/orders/${order.id}`
                      )
                    }
                  >
                    <td style={td}>{index + 1}</td>
                    <td style={td}>{order.orderRef}</td>
                    <td style={td}>{itemsCount}</td>
                    <td style={td}>{order.totalPrice} грн</td>

                    <td style={td}>
                      <span
                        style={{
                          background: status.color,
                          color: "white",
                          padding: "4px 10px",
                          borderRadius: "999px",
                          fontSize: "12px",
                          fontWeight: 600,
                        }}
                      >
                        {status.label}
                      </span>
                    </td>

                    <td style={td}>
                      {new Date(order.createdAt).toLocaleString("uk-UA")}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const td = {
  padding: "14px 16px",
  fontSize: "14px",
  color: "#1f2a44",
};
