"use client";

import { setFilters } from "@/redux/pamplabua/slices/productsSlice";
import { RootState } from "@/redux/pamplabua/store";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

export function ProducerFilterComponent() {
  const {
    globalProducerCount,
    filteredProducerCount,
    producerSelectFilter,
    categorySelectFilters,
  } = useSelector((store: RootState) => store.productsSlice);

  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);

  const filterByCategory = categorySelectFilters.length > 0; // головна умова

  return (
    <>
      <div className="filter-group-header" onClick={() => setOpen(!open)}>
        <p className="fs-lg font-bold uppercase">Виробник</p>
        <MdKeyboardArrowDown
          className={`filter-arrow ${open ? "open" : ""}`}
          size={20}
        />
      </div>

      {open && (
        <ul className="filter-list">
          {Object.entries(globalProducerCount).map(([key, globalCount]) => {
            // 🔥 Обчислюємо актуальну кількість
            const actualCount = filterByCategory
              ? filteredProducerCount[key] ?? 0 // коли вибрана категорія
              : globalCount; // коли категорії не вибрані

            // 🔥 Ховаємо тільки коли є вибрані категорії і count = 0
            if (filterByCategory && actualCount === 0) return null;

            return (
              <li className="filter-item" key={key}>
                <label className="filter-label">
                  <input
                    type="checkbox"
                    checked={producerSelectFilter.includes(key)}
                    onChange={() =>
                      dispatch(
                        setFilters({
                          value: key,
                          filters: "producerSelectFilter",
                        })
                      )
                    }
                  />
                  <span className="fs-lg">{key}</span>
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
