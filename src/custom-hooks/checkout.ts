export const handleCheckout = async () => {
  const res = await fetch("/api/checkout", { method: "POST" });
  const data = await res.json();

  if (data.url) {
    window.location.href = data.url; // Редирект на оплату
  } else {
    alert("Ошибка при создании платежа");
  }
};
