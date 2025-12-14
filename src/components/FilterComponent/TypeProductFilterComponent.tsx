"use client";

import { RootState } from "@/redux/pamplabua/store";
import { setFilters } from "@/redux/pamplabua/slices/productsSlice";
import { useSelector, useDispatch } from "react-redux";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useState } from "react";

export function TypeProductFilterComponent() {
  const {
    products,
    filteredProducts,
    typeSelectFilter,
    categorySelectFilters,
  } = useSelector((s: RootState) => s.productsSlice);

  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);

  // ❗ без категорії — не показуємо
  if (!categorySelectFilters.length) return null;

  // ===============================
  // 1️⃣ продукти вибраної категорії
  // ===============================
  const categoryProducts = products.filter((p) =>
    categorySelectFilters.includes(p.category)
  );

  // ===============================
  // 2️⃣ типи в категорії (ЗАВЖДИ)
  // ===============================
  const categoryTypeCount: Record<string, number> = {};

  for (const p of categoryProducts) {
    if (!p.type || !p.type.trim()) continue;
    categoryTypeCount[p.type] = (categoryTypeCount[p.type] || 0) + 1;
  }

  const types = Object.keys(categoryTypeCount);
  if (!types.length) return null;

  return (
    <>
      <div className="filter-group-header" onClick={() => setOpen(!open)}>
        <p className="fs-lg font-bold uppercase">Тип продукції</p>
        <MdKeyboardArrowDown
          size={20}
          className={`filter-arrow ${open ? "open" : ""}`}
        />
      </div>

      {open && (
        <ul className="filter-list">
          {types.map((type) => {
            const isChecked = typeSelectFilter.includes(type);

            const count = isChecked
              ? filteredProducts.length
              : categoryTypeCount[type];

            return (
              <li key={type} className="filter-item">
                <label className="filter-label">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() =>
                      dispatch(
                        setFilters({
                          value: type,
                          filters: "typeSelectFilter",
                        })
                      )
                    }
                  />
                  <span className="fs-lg">{type}</span>
                </label>

                <span className="filter-count fs-md">({count})</span>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
