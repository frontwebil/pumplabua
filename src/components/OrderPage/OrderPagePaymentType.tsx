"use client";

import { FaCheck } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/pamplabua/store";
import { setTypeOfPay } from "@/redux/pamplabua/slices/orderSlice";

export function PaymentMethod() {
  const dispatch = useDispatch();
  const { typeOfPay, delivery } = useSelector(
    (store: RootState) => store.OrderProductsSlice
  );

  return (
    <>
      <h2 className="font-bold uppercase fs-md">Оплата</h2>
      <div className="payment-container">
        {/* Онлайн */}
        <div
          className={`payment-card ${typeOfPay === "online" ? "active" : ""}`}
          onClick={() => dispatch(setTypeOfPay("online"))}
        >
          <div className="payment-title-row">
            <span>Онлайн-оплата</span>
            <div
              className={`delivery-container-block-cheked ${
                typeOfPay === "online" ? "active" : ""
              }`}
            >
              <FaCheck />
            </div>
          </div>

          <div className="payment-subtext">Швидко і Безпечно</div>
        </div>

        {/* При отриманні */}
        <div
          className={`payment-card ${
            typeOfPay === "when received" ? "active" : ""
          }`}
          onClick={() => dispatch(setTypeOfPay("when received"))}
        >
          <div className="payment-title-row">
            <span>Оплата при отриманні</span>
            <div
              className={`delivery-container-block-cheked ${
                typeOfPay === "when received" ? "active" : ""
              }`}
            >
              <FaCheck />
            </div>
          </div>

          <div className="payment-subtext">
            {delivery == "Самовивіз" ? "При отриманні" : "Через Нову Пошту"}
          </div>
        </div>
      </div>
    </>
  );
}
