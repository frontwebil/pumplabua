"use client";

import { useEffect, useState } from "react";
import { OrderModalPrice } from "../OrderModal/OrderModalPrice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/pamplabua/store";
import {
  setName,
  setSurname,
  setMiddleName,
  setPhoneNumber,
  setEmail,
} from "@/redux/pamplabua/slices/orderSlice";
import { OrderPageContacts } from "./OrderPageContacts";
import { OrderPageDelivery } from "./OrderPageDelivery";
import { PaymentMethod } from "./OrderPagePaymentType";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import Link from "next/link";
import { SITE_LINKS } from "@/site-config/site.config";
import { useRouter } from "next/navigation";
import { closeOrderModal } from "@/redux/pamplabua/slices/uiSlice";
import { toast } from "react-toastify";
import { SendMessageToTelegram } from "@/custom-hooks/sendMessageToTelegram";

type UserType = {
  name?: string | null;
  surname?: string | null;
  middleName?: string | null;
  phoneNumber?: string | null;
  email?: string | null;
};

export function OrderPageContainer({ user }: { user: UserType | null }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {
    orderProducts,
    name,
    surname,
    middleName,
    phoneNumber,
    email,
    delivery,
    villageCity,
    department,
    typeOfPay,
  } = useSelector((store: RootState) => store.OrderProductsSlice);

  const orderFromRedux = {
    orderProducts,
    name,
    surname,
    middleName,
    phoneNumber,
    email,
    delivery,
    villageCity,
    street: "not-required",
    department,
    typeOfPay,
  };

  useEffect(() => {
    if (orderProducts.length < 1) {
      dispatch(closeOrderModal());
      router.replace(SITE_LINKS.CATALOG);
    }
  }, [orderProducts]);

  useEffect(() => {
    if (!user) return;

    if (user.name) dispatch(setName(user.name));
    if (user.surname) dispatch(setSurname(user.surname));
    if (user.middleName) dispatch(setMiddleName(user.middleName));
    if (user.phoneNumber) dispatch(setPhoneNumber(user.phoneNumber));
    if (user.email) dispatch(setEmail(user.email));
  }, [user, dispatch]);

  const totalPrice = orderProducts.reduce((sum, el) => {
    const price = el.selectedVariant.discount
      ? Math.ceil(
          el.selectedVariant.price * (1 - el.selectedVariant.discount / 100),
        )
      : el.selectedVariant.price;

    return sum + price * el.quantityProduct;
  }, 0);

  const deliveryPrice = totalPrice >= 3000 ? 0 : 89;

  const handleOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) return;

    // ✅ ВАЛІДАЦІЯ КОНТАКТІВ
    if (!name || !surname || !phoneNumber || !email) {
      toast.error("Заповніть контактні дані");
      return;
    }

    // ✅ СПОСІБ ДОСТАВКИ
    if (!delivery) {
      toast.error("Оберіть спосіб доставки");
      return;
    }

    // ✅ ВІДДІЛЕННЯ
    if (delivery === "Відділення" && !department) {
      toast.error("Вкажіть номер відділення");
      return;
    }

    // ✅ АДРЕСА КУРʼЄРОМ
    if (delivery === "Поштомат" && !department) {
      toast.error("Вкажіть номер поштомату");
      return;
    }

    // ✅ СПОСІБ ОПЛАТИ
    if (!typeOfPay) {
      toast.error("Оберіть спосіб оплати");
      return;
    }

    // ✅ КОШИК
    if (orderProducts.length === 0) {
      toast.error("Кошик порожній");
      return;
    }

    // ✅ УСПІХ — ВІДПРАВКА
    setLoading(true);

    const res = await fetch("/api/order/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderFromRedux),
    });

    const data = await res.json();

    const htmlSend = `
    ${typeOfPay === "vet_sport" && "Оплата по Вет Спорту"}
  <b>Нове повідомлення з сайту:</b>
  <b>У вас нове замовлення!</b>\n
      `;
    await SendMessageToTelegram({ htmlSend });

    if (data.payment === "offline") {
      router.push(`/order/success?ref=${data.orderRef}`);
      return;
    }

    const div = document.createElement("div");
    div.innerHTML = data.form;
    document.body.appendChild(div);

    const form = document.querySelector(
      'form[name="wayforpay"]',
    ) as HTMLFormElement;

    form.submit();
  };

  return (
    <form onSubmit={handleOrder}>
      <div className="container">
        <div className="OrderPage-content">
          {/* КОНТАКТИ */}
          <OrderPageContacts />
          {/* ДОСТАВКА */}
          <OrderPageDelivery deliveryPrice={deliveryPrice} />
          {/* Тип оплати */}
          <PaymentMethod />
        </div>

        {/* ПРАВИЙ БЛОК */}
        <div className="OrderPage-content-price-count">
          <OrderModalPrice />
        </div>
      </div>
      <div className="container">
        <div className="OrderPage-content-buttons">
          <Link href={SITE_LINKS.CATALOG} className="button-back">
            <MdOutlineKeyboardArrowLeft />
            <span>Назад</span>
          </Link>
          <button className="OrderPage-order-button">
            {loading
              ? "Оформлюємо замовлення..."
              : typeOfPay == "when received"
                ? "Оформити замовлення"
                : typeOfPay == "vet_sport" ? "Оформити замовлення" : "Перейти до оплати"}
            {}
          </button>
        </div>
      </div>
    </form>
  );
}
