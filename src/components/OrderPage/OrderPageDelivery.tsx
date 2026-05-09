/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { RootState } from "@/redux/pamplabua/store";
import { useDispatch, useSelector } from "react-redux";
import { FaCheck } from "react-icons/fa";
import Image from "next/image";
import {
  setDeliveryType,
  setDepartment,
  setVillageCity,
} from "@/redux/pamplabua/slices/orderSlice";
import { useEffect, useState } from "react";

export function OrderPageDelivery({
  deliveryPrice,
}: {
  deliveryPrice: number;
}) {
  const dispatch = useDispatch();
  const { delivery, villageCity, department } = useSelector(
    (store: RootState) => store.OrderProductsSlice
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  const [isCitySelected, setIsCitySelected] = useState(false);

  const [cities, setCities] = useState<any[]>([]);

  const [cityRef, setCityRef] = useState<string | null>(null);
  const [warehouses, setWarehouses] = useState<any[]>([]);
  const [loadingWarehouses, setLoadingWarehouses] = useState(false);

  const [warehouseSearch, setWarehouseSearch] = useState("");
  const [filteredWarehouses, setFilteredWarehouses] = useState<any[]>([]);

  const handleCitySearch = async (value: string) => {
    setIsCitySelected(false);
    dispatch(setVillageCity(value));

    if (value.length < 2) return setCities([]);

    const res = await fetch("/api/nova-poshta/cities", {
      method: "POST",
      body: JSON.stringify({ city: value }),
    });

    const data = await res.json();
    setCities(data?.Addresses || []);
  };

  useEffect(() => {
    if (!warehouseSearch) {
      setFilteredWarehouses(warehouses);
    } else {
      const q = warehouseSearch.toLowerCase();

      setFilteredWarehouses(
        warehouses.filter((w) => w.Description.toLowerCase().includes(q))
      );
    }
  }, [warehouseSearch, warehouses]);

  useEffect(() => {
    if (!cityRef) return;

    setLoadingWarehouses(true);
    setWarehouses([]);

    fetch("/api/nova-poshta/warehouses", {
      method: "POST",
      body: JSON.stringify({
        cityRef,
        type: delivery === "Поштомат" ? "postomat" : "warehouse",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setWarehouses(data);
        setLoadingWarehouses(false);
      });
  }, [cityRef, delivery]);

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
            {!mounted
              ? null
              : deliveryPrice > 60
              ? "від 60 грн"
              : "Безкоштовно"}
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
            {!mounted
              ? null
              : deliveryPrice > 60
              ? "від 60 грн"
              : "Безкоштовно"}
          </div>
        </div>
      </div>

      <div
        style={{display:'none'}}
        className={`delivery-container-block mb-10 ${
          delivery === "Самовивіз" ? "active" : ""
        }`}
        onClick={() => dispatch(setDeliveryType("Самовивіз"))}
      >
        <div
          className={`delivery-container-block-cheked ${
            delivery === "Самовивіз" ? "active" : ""
          }`}
        >
          <FaCheck />
        </div>
        <Image src="/logo.svg" alt="Нова пошта" width={150} height={150} />
        <p className="delivery-container-block-text">Самовивіз із магазину</p>
        <div className="delivery-container-block-price">
          Вул. Літературна 27 ТРЦ City Mall
        </div>
      </div>

      {delivery !== "Самовивіз" && (
        <div className="OrderPage-content-row">
          <div className="OrderPage-content-group">
            <label>Місто/Населений пункт</label>
            <input
              placeholder="Введіть назву населеного пункту"
              value={villageCity}
              onChange={(e) => handleCitySearch(e.target.value)}
            />

            {cities.length > 0 && (
              <div className="dropdown">
                {cities.map((city) => (
                  <div
                    key={city.Ref}
                    onClick={() => {
                      dispatch(setVillageCity(city.Present));
                      dispatch(setDepartment(""));
                      setCities([]);
                      setIsCitySelected(true);
                      setCityRef(city.DeliveryCity);
                    }}
                  >
                    {city.Present}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      {delivery !== "Самовивіз" && (
        <div className="OrderPage-content-row">
          <div className="OrderPage-content-group">
            <label>{delivery}</label>
            <input
              placeholder={
                !isCitySelected
                  ? "Спочатку оберіть місто"
                  : loadingWarehouses
                  ? "Завантаження відділень..."
                  : "Почніть вводити номер або адресу"
              }
              disabled={!isCitySelected || loadingWarehouses}
              value={warehouseSearch || department}
              onChange={(e) => {
                setWarehouseSearch(e.target.value);
                dispatch(setDepartment(e.target.value));
              }}
            />

            {isCitySelected &&
              warehouseSearch &&
              filteredWarehouses.length > 0 && (
                <div className="dropdown">
                  {filteredWarehouses.map((w) => (
                    <div
                      key={w.Ref}
                      onClick={() => {
                        dispatch(setDepartment(w.Description));
                        setWarehouseSearch("");
                      }}
                    >
                      {w.Description}
                    </div>
                  ))}
                </div>
              )}
          </div>
        </div>
      )}
    </>
  );
}
