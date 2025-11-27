export function getOrderEmailTemplate({
  name,
  orderRef,
  status,
  total,
}: {
  name: string;
  orderRef: string;
  status: string;
  total: number;
}) {
  const STATUS_TEXT: Record<string, { title: string; message: string }> = {
    NEW: {
      title: "Замовлення прийнято ✅",
      message:
        "Дякуємо за замовлення! Ми вже отримали його та розпочали обробку.",
    },
    PENDING: {
      title: "Очікується оплата ⏳",
      message:
        "Ваше замовлення очікує оплату. Будь ласка, завершіть платіж, щоб ми могли почати обробку.",
    },
    PAID: {
      title: "Оплата успішна 💳",
      message: "Ми отримали вашу оплату та готуємо товар до відправки.",
    },
    CONFIRMED: {
      title: "Замовлення підтверджене 📦",
      message:
        "Ваше замовлення підтверджено менеджером і готується до відправки.",
    },
    SENDTORECEIVER: {
      title: "Замовлення відправлено 🚚",
      message:
        "Ваше замовлення передано службі доставки та скоро прибуде до вас.",
    },
    DELIVERED: {
      title: "Замовлення доставлено ✅",
      message: "Дякуємо за покупку! Якщо виникнуть питання — напишіть нам.",
    },
    FAILED: {
      title: "Помилка оплати ❌",
      message: "Під час оплати сталася помилка. Будь ласка, спробуйте ще раз.",
    },
    CANCELED: {
      title: "Замовлення скасовано ❌",
      message:
        "Ваше замовлення було скасовано. Якщо це помилка — зверніться до підтримки.",
    },
  };

  const data = STATUS_TEXT[status];

  return `
<div style="font-family: Inter, sans-serif; background: #0f172a; color: #e2e8f0; padding: 40px; border-radius: 16px; max-width: 540px; margin: auto;">
  <h1 style="color: #f8fafc">${data.title}</h1>

  <p style="color: #cbd5f5">Привіт, ${name} 👋</p>

  <div style="background: #1e293b; padding: 20px; border-radius: 12px; margin-top: 20px;">
    <p>
      <b>Номер замовлення:</b> ${orderRef}
    </p>

    <p>
      <b>Сума:</b> ${total} грн
    </p>

    <p style="margin-top: 12px">
      ${data.message}
    </p>
  </div>

  <div style="text-align:center;margin-top:24px">
    <a href="https://pumplabua.shop/account/orders"
      style="display:inline-block;background:linear-gradient(90deg,#3b82f6,#8b5cf6);color:white;padding:12px 22px;border-radius:8px;text-decoration:none;font-weight:600">
      Переглянути замовлення
    </a>
  </div>

  <p style="color:#64748b;margin-top:24px;font-size:13px">
    Дякуємо, що обрали Pamplabua ❤️
  </p>
</div>
`;
}
