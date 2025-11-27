"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type OrderItem = {
  id: string;
  name: string;
  producer: string;
  price: number;
  quantity: number;
  images: string[];
  finalPrice: number;
};

type Order = {
  id: string;
  orderRef?: string | null;
  status: string;
  name: string;
  surname: string;
  middleName?: string | null;
  phoneNumber: string;
  email?: string | null;
  delivery: string;
  villageCity?: string | null;
  street?: string | null;
  department?: string | null;
  typeOfPay: string;
  totalPrice: number;
  deliveryPrice: number;
  discount: number;
  createdAt: string;
  items: OrderItem[];
};

const STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  NEW: { label: "Новий", color: "bg-blue-500" },
  PENDING: { label: "Очікує оплату", color: "bg-amber-400" },
  PAID: { label: "Оплачено", color: "bg-green-500" },
  CONFIRMED: { label: "Підтверджено", color: "bg-indigo-600" },
  SENDTORECEIVER: { label: "Відправлено", color: "bg-sky-500" },
  DELIVERED: { label: "Доставлено", color: "bg-emerald-600" },
  FAILED: { label: "Помилка", color: "bg-red-500" },
  CANCELED: { label: "Скасовано", color: "bg-gray-400" },
};

export default function OrderPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [statusLoading, setStatusLoading] = useState(false);

  useEffect(() => {
    fetch(`/api/admin/get-orders/${id}`)
      .then(async (r) => {
        if (!r.ok) throw new Error(await r.text());
        return r.json();
      })
      .then(setOrder)
      .catch((e) => alert(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="p-10 text-slate-600">Завантаження…</p>;
  if (!order)
    return <p className="p-10 text-red-500">Замовлення не знайдено</p>;

  const status = STATUS_CONFIG[order.status] ?? {
    label: order.status,
    color: "bg-gray-500",
  };

  const itemsCount = order.items.reduce((s, i) => s + i.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-8">
      <div className="mx-auto max-w-6xl">
        {/* HEADER */}
        <div className="mb-6 space-y-2">
          <button
            onClick={() => router.back()}
            className="rounded-md border border-slate-200 bg-white px-3 py-1 text-sm hover:bg-slate-100"
          >
            ← Назад
          </button>

          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold">
              Замовлення № {order.orderRef ?? order.id}
            </h1>

            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold text-white ${status.color}`}
            >
              {status.label}
            </span>
          </div>

          <div className="text-sm text-slate-500">
            Створено: {new Date(order.createdAt).toLocaleString("uk-UA")}
          </div>
        </div>

        {/* GRID */}
        <div className="grid gap-4 md:grid-cols-3">
          {/* CONTACT */}
          <Card title="Контактні дані">
            <Row
              label="ПІБ"
              value={`${order.surname} ${order.name} ${order.middleName ?? ""}`}
            />
            <Row label="Телефон" value={order.phoneNumber} />
            <Row label="Email" value={order.email ?? "—"} />
          </Card>

          {/* DELIVERY */}
          <Card title="Доставка">
            <Row label="Тип" value={order.delivery} />
            <Row label="Місто" value={order.villageCity ?? "—"} />
            <Row label="Вулиця" value={order.street ?? "—"} />
            <Row label="Відділення" value={order.department ?? "—"} />
          </Card>

          {/* PAYMENT */}
          <Card title="Оплата">
            <Row label="Тип" value={order.typeOfPay == 'when_received' ? "При отриманні" : "Онлайн"} />
            <Row label="К-ть товарів" value={`${itemsCount} шт`} />
            <Row label="Доставка" value={`${order.deliveryPrice} грн`} />
            <Row label="Знижка" value={`${order.discount} грн`} />
            <Row
              label="Сума"
              value={
                <span className="text-lg font-bold">
                  {order.totalPrice + order.deliveryPrice} грн
                </span>
              }
            />
          </Card>
        </div>

        {/* ITEMS */}
        <div className="mt-6 rounded-xl border border-slate-200 bg-white shadow-sm">
          <h3 className="border-b px-4 py-3 font-semibold">Товари</h3>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-100 text-xs uppercase text-slate-600">
                <tr>
                  <Th>Товар</Th>
                  <Th>Ціна</Th>
                  <Th>К-ть</Th>
                  <Th>Разом</Th>
                </tr>
              </thead>

              <tbody>
                {order.items.map((item) => (
                  <tr key={item.id} className="border-t">
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        {item.images?.[0] && (
                          <img
                            src={item.images[0]}
                            alt={item.name}
                            className="h-12 w-12 rounded-lg object-cover"
                          />
                        )}
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-xs text-slate-500">
                            {item.producer}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">{item.finalPrice} грн</td>
                    <td className="p-3">{item.quantity}</td>
                    <td className="p-3 font-semibold">
                      {item.finalPrice * item.quantity} грн
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-6 max-w-md rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="mb-3 text-lg font-semibold">Змінити статус</h3>

          <select
            value={order.status}
            disabled={statusLoading}
            onChange={async (e) => {
              const newStatus = e.target.value;

              if (!confirm("Ви впевнені, що хочете змінити статус?")) return;

              setStatusLoading(true);

              const res = await fetch(`/api/admin/update-orders/${order.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus }),
              });

              if (res.ok) {
                setOrder((prev) =>
                  prev ? { ...prev, status: newStatus } : prev
                );
              } else {
                alert("Помилка при оновленні статусу");
              }

              setStatusLoading(false);
            }}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:opacity-50"
          >
            {Object.keys(STATUS_CONFIG).map((key) => (
              <option key={key} value={key}>
                {STATUS_CONFIG[key].label}
              </option>
            ))}
          </select>

          {statusLoading && (
            <p className="mt-2 text-xs text-slate-500">Оновлення статусу...</p>
          )}
        </div>
      </div>
    </div>
  );
}

/* UI PARTS */

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="mb-3 font-semibold">{title}</h3>
      <div className="space-y-2 text-sm">{children}</div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between gap-2">
      <span className="text-slate-500">{label}</span>
      <span className="font-medium text-slate-900">{value}</span>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="px-4 py-2 font-medium text-slate-600">{children}</th>;
}
