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

function groupVariants(variants: Variant[]) {
  const map = new Map();

  variants.forEach((v) => {
    const key = `${v.amount}-${v.unitType}`;
    if (!map.has(key)) {
      map.set(key, {
        amount: v.amount,
        unitType: v.unitType,
        flavors: new Set(),
      });
    }
    map.get(key).flavors.add(v.flavor);
  });

  return Array.from(map.values()).map((item) => ({
    amount: item.amount,
    unitType: item.unitType,
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
  const sizes = grouped.map((g) => `${g.amount} ${g.unitType}`);

  const availableFlavors = selectedAmount
    ? grouped.find((g) => `${g.amount} ${g.unitType}` === selectedAmount)
        ?.flavors ?? []
    : [];

  // 1. Синхронізація Redux -> Локальний стейт (при першому завантаженні або зміні ззовні)
  useEffect(() => {
    if (!selectedVariant) return;
    const amountKey = `${selectedVariant.amount} ${selectedVariant.unitType}`;

    // Оновлюємо локальний стейт тільки якщо він відрізняється, щоб уникнути циклів
    if (amountKey !== selectedAmount) setSelectedAmount(amountKey);
    if (selectedVariant.flavor !== selectedFlavor)
      setSelectedFlavor(selectedVariant.flavor);
  }, [selectedVariant]);

  // 2. Логіка зміни ВАГИ
  const handleAmountChange = (newAmount: string) => {
    setSelectedAmount(newAmount);

    // Знаходимо смаки для нової ваги
    const newGroup = grouped.find(
      (g) => `${g.amount} ${g.unitType}` === newAmount
    );
    const newFlavors = newGroup?.flavors ?? [];

    // Якщо поточного смаку немає в новій вазі, вибираємо перший доступний
    let flavorToSelect = selectedFlavor;
    if (selectedFlavor && !newFlavors.includes(selectedFlavor)) {
      flavorToSelect = newFlavors[0]; // Авто-вибір першого смаку
      setSelectedFlavor(flavorToSelect);
    }

    // Одразу шукаємо і діспатчимо варіант, не чекаючи useEffect
    const variant = currentProduct.variants.find(
      (v) =>
        `${v.amount} ${v.unitType}` === newAmount && v.flavor === flavorToSelect
    );

    if (variant) {
      dispatch(setQuantity(1));
      dispatch(setSelectedVariant(variant));
    }
  };

  // 3. Логіка зміни СМАКУ
  const handleFlavorChange = (newFlavor: string) => {
    setSelectedFlavor(newFlavor);

    const variant = currentProduct.variants.find(
      (v) =>
        `${v.amount} ${v.unitType}` === selectedAmount && v.flavor === newFlavor
    );

    if (variant) {
      dispatch(setQuantity(1));
      dispatch(setSelectedVariant(variant));
    }
  };

  return (
    <div className="variant-selector">
      <div className="variant-column size">
        <label>Маса</label>
        <select
          value={selectedAmount ?? ""}
          onChange={(e) => handleAmountChange(e.target.value)} // Використовуємо нову функцію
        >
          {sizes.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="variant-column taste">
        <label>Смак</label>
        <select
          value={selectedFlavor ?? ""}
          onChange={(e) => handleFlavorChange(e.target.value)} // Використовуємо нову функцію
        >
          {availableFlavors.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
      </div>

      {/* ... решта коду (кількість) без змін ... */}
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
