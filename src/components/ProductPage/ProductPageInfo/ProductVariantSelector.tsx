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

  const flavors = selectedAmount
    ? grouped.find((g) => `${g.amount} ${g.unitType}` === selectedAmount)
        ?.flavors ?? []
    : [];

  useEffect(() => {
    if (!selectedVariant) return;

    const amountKey = `${selectedVariant.amount} ${selectedVariant.unitType}`;
    setSelectedAmount(amountKey);
    setSelectedFlavor(selectedVariant.flavor);
  }, [selectedVariant]);

  useEffect(() => {
    if (!selectedAmount || !selectedFlavor) return;

    const variant = currentProduct.variants.find(
      (v) =>
        `${v.amount} ${v.unitType}` === selectedAmount &&
        v.flavor === selectedFlavor
    );

    if (variant && selectedVariant?.id !== variant.id) {
      dispatch(setSelectedVariant(variant));
    }
  }, [selectedAmount, selectedFlavor, currentProduct, dispatch]);

  return (
    <div className="variant-selector">
      <div className="variant-column size">
        <label>Маса</label>
        <select
          value={selectedAmount ?? ""}
          onChange={(e) => setSelectedAmount(e.target.value)}
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
          onChange={(e) => setSelectedFlavor(e.target.value)}
        >
          {flavors.map((f) => (
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
