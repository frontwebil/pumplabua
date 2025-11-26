"use client";

import { useEffect } from "react";
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

type UserType = {
  name?: string | null;
  surname?: string | null;
  middleName?: string | null;
  phoneNumber?: string | null;
  email?: string | null;
};

export function OrderPageContainer({ user }: { user: UserType | null }) {
  const dispatch = useDispatch();
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
    street,
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
    street,
    department,
    typeOfPay,
  };

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
          el.selectedVariant.price * (1 - el.selectedVariant.discount / 100)
        )
      : el.selectedVariant.price;

    return sum + price * el.quantityProduct;
  }, 0);

  const deliveryPrice = totalPrice >= 3000 ? 0 : 89;

  const handleOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch("/api/order/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderFromRedux),
    });

    const data = await res.json();

    if (data.payment === "offline") {
      router.push(`/order/success?ref=${data.orderRef}`);
      return;
    }

    const div = document.createElement("div");
    div.innerHTML = data.form;
    document.body.appendChild(div);

    const form = document.querySelector(
      'form[name="wayforpay"]'
    ) as HTMLFormElement;
    form.submit();
  };

  return (
    <div className="container">
      <form className="OrderPage-content" onSubmit={handleOrder}>
        {/* КОНТАКТИ */}
        <OrderPageContacts />
        {/* ДОСТАВКА */}
        <OrderPageDelivery deliveryPrice={deliveryPrice} />
        {/* Тип оплати */}
        <PaymentMethod />
        <div className="OrderPage-content-buttons">
          <Link href={SITE_LINKS.CATALOG} className="button-back">
            <MdOutlineKeyboardArrowLeft />
            <span>Назад</span>
          </Link>
          <button className="OrderPage-order-button">
            {typeOfPay == "when received"
              ? "Оформити замовлення"
              : "Перейти до оплати"}
          </button>
        </div>
      </form>

      {/* ПРАВИЙ БЛОК */}
      <div className="OrderPage-content-price-count">
        <OrderModalPrice />
      </div>
    </div>
  );
}
