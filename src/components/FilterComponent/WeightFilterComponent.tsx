"use client";

import { setFilters } from "@/redux/pamplabua/slices/productsSlice";
import { RootState } from "@/redux/pamplabua/store";
import { useSelector, useDispatch } from "react-redux";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useState } from "react";

export function WeightFilterComponent() {
  const {
    globalWeightCount,
    filteredWeightCount,
    weightSelectFilter,
    categorySelectFilters,
    producerSelectFilter,
  } = useSelector((store: RootState) => store.productsSlice);

  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);

  // 🔥 Показувати фільтр "вага" тільки коли:
  // є вибрана категорія або виробник
  const shouldShowWeightFilter =
    categorySelectFilters.length > 0 || producerSelectFilter.length > 0;

  // Якщо немає активних категорій/виробників → не рендеримо нічого
  if (!shouldShowWeightFilter) return null;

  const useFiltered =
    categorySelectFilters.length > 0 || producerSelectFilter.length > 0;

  return (
    <>
      <div className="filter-group-header" onClick={() => setOpen(!open)}>
        <p className="fs-lg font-bold uppercase">Вага</p>
        <MdKeyboardArrowDown
          size={20}
          className={`filter-arrow ${open ? "open" : ""}`}
        />
      </div>

      {open && (
        <ul className="filter-list">
          {Object.entries(globalWeightCount).map(([weightKey, globalCount]) => {
            const actualCount = useFiltered
              ? filteredWeightCount[weightKey] ?? 0
              : globalCount;

            // 🔥 Якщо ваги немає у фільтрованому наборі — ховаємо цей пункт
            if (actualCount === 0) return null;

            const isChecked = weightSelectFilter.includes(weightKey);

            return (
              <li key={weightKey} className="filter-item">
                <label className="filter-label">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() =>
                      dispatch(
                        setFilters({
                          value: weightKey,
                          filters: "weightSelectFilter",
                        })
                      )
                    }
                  />
                  <span className="fs-lg">{weightKey}</span>
                </label>
                <span className="filter-count fs-md">({actualCount})</span>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
