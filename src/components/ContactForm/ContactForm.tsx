"use client";

import "@/components/ContactForm/ContactForm.css";
import { SendMessageToTelegram } from "@/custom-hooks/sendMessageToTelegram";
import { useState } from "react";
import { toast } from "react-toastify";

export function ContactForm() {
  const [name, setName] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d+]/g, ""); // дозволяємо тільки цифри і +
    setPhoneNum(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) return;

    if (!name.trim() || !phoneNum.trim() || !text.trim()) {
      return;
    }

    setLoading(true);

    const htmlSend = `
<b>Нове повідомлення з сайту:</b>
<b>👤 Ім’я:</b> ${name}\n
<b>📞 Телефон:</b> <a href="tel:${phoneNum}">${phoneNum}</a>\n
<b>💬 Повідомлення:</b> ${text}
    `;
    try {
      await SendMessageToTelegram({ htmlSend });
      toast("Дякуємо! Ваш запит на консультацію вже в обробці 😊");
      setName("");
      setPhoneNum("");
      setText("");
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <h2 className="fs-xl font-bold uppercase">зв’яжіться з нами!</h2>
      <h3 className="fs-lg" style={{ color: "#4F5052" }}>
        Наш менеджер завжди радий дати відповіді на ваші запитання
      </h3>
      <div className="form-inputs">
        <div className="form-input-wrapper">
          <label htmlFor="name" className="fs-sm font-bold uppercase">
            Ім’я
          </label>
          <input
            id="name"
            value={name}
            type="text"
            placeholder="Як до вас звертатись"
            className="form-input"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-input-wrapper">
          <label htmlFor="phone" className="fs-sm font-bold uppercase">
            Номер телефону
          </label>
          <input
            value={phoneNum}
            id="phone"
            type="tel"
            placeholder="+380 00 000 0000"
            className="form-input"
            required
            onChange={handlePhoneChange}
          />
        </div>

        <div className="form-input-wrapper">
          <label htmlFor="message" className="fs-sm font-bold uppercase">
            Запит
          </label>
          <textarea
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
            id="message"
            placeholder="Опишіть ваше питання або запит"
            className="form-input"
            rows={4}
            required
          />
        </div>
      </div>
      <button className="contact-form-submit-button" disabled={loading}>
        {loading ? "Надсилаємо..." : "Надіслати"}
      </button>
    </form>
  );
}
