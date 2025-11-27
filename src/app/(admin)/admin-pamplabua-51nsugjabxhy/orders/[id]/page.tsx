"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

/* TYPES */
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

/* STATUS MAP */
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

  const [editOpen, setEditOpen] = useState(false);
  const [editLoading, setEditLoading] = useState(false);

  const [editForm, setEditForm] = useState({
    name: "",
    surname: "",
    middleName: "",
    phoneNumber: "",
    email: "",
    delivery: "",
    villageCity: "",
    street: "",
    department: "",
  });

  /* FETCH ORDER */
  useEffect(() => {
    fetch(`/api/admin/get-orders/${id}`)
      .then(async (r) => {
        if (!r.ok) throw new Error(await r.text());
        return r.json();
      })
      .then(setOrder)
      .finally(() => setLoading(false));
  }, [id]);

  /* FILL EDIT FORM */
  useEffect(() => {
    if (!order) return;
    setEditForm({
      name: order.name,
      surname: order.surname,
      middleName: order.middleName || "",
      phoneNumber: order.phoneNumber,
      email: order.email || "",
      delivery: order.delivery,
      villageCity: order.villageCity || "",
      street: order.street || "",
      department: order.department || "",
    });
  }, [order]);

  if (loading) return <p className="p-10 text-slate-500">Завантаження…</p>;
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
            className="rounded-md border bg-white px-3 py-1 text-sm hover:bg-slate-100"
          >
            ← Назад
          </button>

          <div className="flex items-center gap-3">
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
        <div className="mb-3">
          <button
            onClick={() => setEditOpen(true)}
            className="rounded-md border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-100"
          >
            ✏ Змінити контактні дані
          </button>
        </div>

        {/* GRID */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card title="Контактні дані">
            <Row
              label="ПІБ"
              value={`${order.surname} ${order.name} ${order.middleName || ""}`}
            />
            <Row label="Телефон" value={order.phoneNumber} />
            <Row label="Email" value={order.email ?? "—"} />
          </Card>

          <Card title="Доставка">
            <Row label="Тип" value={order.delivery} />
            <Row label="Місто" value={order.villageCity ?? "—"} />
            <Row label="Вулиця" value={order.street ?? "—"} />
            <Row label="Відділення" value={order.department ?? "—"} />
          </Card>

          <Card title="Оплата">
            <Row
              label="Тип"
              value={
                order.typeOfPay === "when_received" ? "При отриманні" : "Онлайн"
              }
            />
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
        <div className="mt-6 rounded-xl border bg-white shadow-sm">
          <h3 className="border-b px-4 py-3 font-semibold">Товари</h3>
          <table className="w-full text-sm">
            <thead className="bg-slate-100 text-xs uppercase">
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
                  <td className="p-3 flex gap-3 items-center">
                    {item.images?.[0] && (
                      <img
                        src={item.images[0]}
                        className="h-12 w-12 rounded object-cover"
                      />
                    )}
                    <div>
                      <b>{item.name}</b>
                      <div className="text-xs text-slate-500">
                        {item.producer}
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

        {/* STATUS CHANGE */}
        <div className="mt-6 max-w-md rounded-xl border bg-white p-5 shadow">
          <h3 className="mb-3 text-lg font-semibold">Змінити статус</h3>

          <select
            value={order.status}
            onChange={async (e) => {
              if (!confirm("Змінити статус?")) return;
              setStatusLoading(true);

              const res = await fetch(`/api/admin/update-orders/${order.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: e.target.value }),
              });

              if (res.ok) {
                const updated = await res.json();
                setOrder(updated);
                setEditOpen(false);
              } else {
                alert("Помилка зміни статусу");
              }
              setStatusLoading(false);
            }}
            disabled={statusLoading}
            className="w-full rounded-lg border px-3 py-2 text-sm"
          >
            {Object.keys(STATUS_CONFIG).map((k) => (
              <option key={k} value={k}>
                {STATUS_CONFIG[k].label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* EDIT MODAL */}
      {editOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-lg space-y-3">
            <h2 className="text-lg font-semibold">Редагування замовлення</h2>

            {Object.entries(editForm).map(([key, value]) => (
              <div key={key}>
                <input
                  placeholder={key}
                  className="w-full rounded border px-3 py-2 text-sm"
                  value={value}
                  onChange={(e) =>
                    setEditForm((prev) => ({ ...prev, [key]: e.target.value }))
                  }
                />
              </div>
            ))}

            <div className="flex justify-between pt-3">
              <button
                onClick={() => setEditOpen(false)}
                className="border px-4 py-2 rounded text-slate-600"
              >
                Скасувати
              </button>

              <button
                disabled={editLoading}
                onClick={async () => {
                  setEditLoading(true);

                  const res = await fetch(
                    `/api/admin/update-orders/${order.id}`,
                    {
                      method: "PATCH",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(editForm),
                    }
                  );

                  if (res.ok) {
                    const updated = await res.json();
                    setOrder(updated);
                    setEditOpen(false);
                  } else {
                    alert("Помилка збереження");
                  }

                  setEditLoading(false);
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Зберегти
              </button>
            </div>
          </div>
        </div>
      )}
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
    <div className="rounded-xl border bg-white p-4 shadow-sm">
      <h3 className="mb-3 font-semibold">{title}</h3>
      <div className="space-y-2 text-sm">{children}</div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between">
      <span className="text-slate-500">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="text-left px-4 py-2 font-medium text-slate-600">
      {children}
    </th>
  );
}

function EditButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="mt-3 w-full rounded border border-blue-200 bg-blue-50 px-3 py-2 text-sm text-blue-600 hover:bg-blue-100"
    >
      ✏ Редагувати
    </button>
  );
}
