"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/pamplabua/store";
import {
  setQuantity,
  setSelectedVariant,
} from "@/redux/pamplabua/slices/productPageSlice";
import "./ProductVariantSelector.css";
import { Variant } from "@prisma/client";

// Формуємо ключ для варіанту
function getVariantKey(v: Variant) {
  if (v.unitType === "size") {
    return v.sizeAmount ?? "";
  }
  return `${v.amount}-${v.unitType}`;
}

// Формуємо красивий текст "500 g" або "XL"
function getDisplayValue(v: Variant) {
  if (v.unitType === "size") {
    return v.sizeAmount ?? "";
  }
  return `${v.amount} ${v.unitType}`;
}

// Групування по масі/розміру
function groupVariants(variants: Variant[]) {
  const map = new Map();

  variants.forEach((v) => {
    const key = getVariantKey(v);

    if (!map.has(key)) {
      map.set(key, {
        key,
        display: getDisplayValue(v),
        flavors: new Set(),
      });
    }

    map.get(key).flavors.add(v.flavor);
  });

  return Array.from(map.values()).map((item) => ({
    key: item.key,
    display: item.display,
    flavors: [...item.flavors],
  }));
}

export function ProductVariantSelector() {
  const dispatch = useDispatch();
  const { currentProduct, selectedVariant, quantityProduct } = useSelector(
    (store: RootState) => store.productPageSlice
  );

  const [selectedAmount, setSelectedAmount] = useState<string | null>(null);
  const [selectedFlavor, setSelectedFlavor] = useState<string | null>(null);

  if (!currentProduct) return null;

  const grouped = groupVariants(currentProduct.variants);

  const availableFlavors = selectedAmount
    ? grouped.find((g) => g.key === selectedAmount)?.flavors ?? []
    : [];

  // === СИНХРОНІЗАЦІЯ Redux → локальний стейт ===
  useEffect(() => {
    if (!selectedVariant) return;

    const key = getVariantKey(selectedVariant);

    if (key !== selectedAmount) setSelectedAmount(key);
    if (selectedVariant.flavor !== selectedFlavor)
      setSelectedFlavor(selectedVariant.flavor);
  }, [selectedVariant]);

  // === Зміна ваги/розміру ===
  const handleAmountChange = (newKey: string) => {
    setSelectedAmount(newKey);

    const group = grouped.find((g) => g.key === newKey);
    const flavors = group?.flavors ?? [];

    let flavorToSelect = selectedFlavor;

    if (!flavorToSelect || !flavors.includes(flavorToSelect)) {
      flavorToSelect = flavors[0];
      setSelectedFlavor(flavorToSelect);
    }

    const variant = currentProduct.variants.find(
      (v) => getVariantKey(v) === newKey && v.flavor === flavorToSelect
    );

    if (variant) {
      dispatch(setQuantity(1));
      dispatch(setSelectedVariant(variant));
    }
  };

  // === Зміна смаку ===
  const handleFlavorChange = (newFlavor: string) => {
    setSelectedFlavor(newFlavor);

    const variant = currentProduct.variants.find(
      (v) => getVariantKey(v) === selectedAmount && v.flavor === newFlavor
    );

    if (variant) {
      dispatch(setQuantity(1));
      dispatch(setSelectedVariant(variant));
    }
  };

  return (
    <div className="variant-selector">
      <div className="variant-column size">
        <label>
          {currentProduct.category === "Аксесуари" ? "Розмір" : "Маса"}
        </label>
        <select
          value={selectedAmount ?? ""}
          onChange={(e) => handleAmountChange(e.target.value)}
        >
          {grouped.map((g) => (
            <option key={g.key} value={g.key}>
              {g.display}
            </option>
          ))}
        </select>
      </div>

      <div className="variant-column taste">
        <label>
          {" "}
          {currentProduct.category === "Аксесуари" ? "Опис" : "Маса"}
        </label>
        <select
          value={selectedFlavor ?? ""}
          onChange={(e) => handleFlavorChange(e.target.value)}
        >
          {availableFlavors.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
      </div>

      <div className="variant-column counts">
        <label>Кількість</label>
        <div className="quantity-box">
          <button
            onClick={() =>
              dispatch(setQuantity(Math.max(1, quantityProduct - 1)))
            }
          >
            –
          </button>
          <span>{quantityProduct}</span>
          <button onClick={() => dispatch(setQuantity(quantityProduct + 1))}>
            +
          </button>
        </div>
      </div>
    </div>
  );
}
