import { RootState } from "@/redux/pamplabua/store";
import { useDispatch, useSelector } from "react-redux";
import { FaCheck } from "react-icons/fa";
import Image from "next/image";
import {
  setDeliveryType,
  setDepartment,
  setStreet,
  setVillageCity,
} from "@/redux/pamplabua/slices/orderSlice";

export function OrderPageDelivery({
  deliveryPrice,
}: {
  deliveryPrice: number;
}) {
  const dispatch = useDispatch();
  const { delivery, villageCity, street, department } = useSelector(
    (store: RootState) => store.OrderProductsSlice
  );
  return (
    <>
      <h2 className="font-bold uppercase fs-md">Доставка</h2>

      <div className="delivery-container">
        <div
          className={`delivery-container-block ${
            delivery === "Відділення" ? "active" : ""
          }`}
          onClick={() => dispatch(setDeliveryType("Відділення"))}
        >
          <div
            className={`delivery-container-block-cheked ${
              delivery === "Відділення" ? "active" : ""
            }`}
          >
            <FaCheck />
          </div>
          <Image
            src="/icons/nova-poshta.svg"
            alt="Нова пошта"
            width={80}
            height={80}
          />
          <p className="delivery-container-block-text">Відділення</p>
          <div className="delivery-container-block-price">
            {deliveryPrice > 60 ? "від 60 грн" : "Безкоштовно"}
          </div>
        </div>

        <div
          className={`delivery-container-block ${
            delivery === "Поштомат" ? "active" : ""
          }`}
          onClick={() => dispatch(setDeliveryType("Поштомат"))}
        >
          <div
            className={`delivery-container-block-cheked ${
              delivery === "Поштомат" ? "active" : ""
            }`}
          >
            <FaCheck />
          </div>
          <Image
            src="/icons/nova-poshta.svg"
            alt="Нова пошта"
            width={80}
            height={80}
          />
          <p className="delivery-container-block-text">Поштомат</p>
          <div className="delivery-container-block-price">
            {deliveryPrice > 60 ? "від 60 грн" : "Безкоштовно"}
          </div>
        </div>
      </div>

      <div className="OrderPage-content-row">
        <div className="OrderPage-content-group">
          <label>Місто/Населений пункт</label>
          <input
            type="text"
            placeholder="Наприклад м.Київ"
            value={villageCity}
            onChange={(e) => dispatch(setVillageCity(e.target.value))}
            required
          />
        </div>

        <div className="OrderPage-content-group">
          <label>Вулиця</label>
          <input
            type="text"
            placeholder="Наприклад вул. Шевченка 39"
            value={street}
            onChange={(e) => dispatch(setStreet(e.target.value))}
            required
          />
        </div>
      </div>

      <div className="OrderPage-content-row">
        <div className="OrderPage-content-group">
          <label>Відділення</label>
          <input
            type="text"
            placeholder="Наприклад Відділення №1 "
            value={department}
            onChange={(e) => dispatch(setDepartment(e.target.value))}
            required
          />
        </div>
      </div>
    </>
  );
}
