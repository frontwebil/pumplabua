"use client";

import { setFilters } from "@/redux/pamplabua/slices/productsSlice";
import { RootState } from "@/redux/pamplabua/store";
import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

export function ProductionFilterComponent() {
  const {
    globalCategoryCount, // стабільна кількість
    filteredCategoryCount, // фільтрована кількість
    categorySelectFilters,
    producerSelectFilter, // 🔥 нове
  } = useSelector((store: RootState) => store.productsSlice);

  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();

  const filterByProducer = producerSelectFilter.length > 0;

  return (
    <>
      <div className="filter-group-header" onClick={() => setOpen(!open)}>
        <p className="fs-lg font-bold uppercase">Продукція</p>
        <MdKeyboardArrowDown
          className={`filter-arrow ${open ? "open" : ""}`}
          size={20}
        />
      </div>

      {open && (
        <ul className="filter-list">
          {Object.entries(globalCategoryCount).map(([key, globalCount]) => {
            // 🔥 якщо вибрані виробники → беремо filtered count
            //    якщо ні — глобальний
            const actualCount = filterByProducer
              ? filteredCategoryCount[key] ?? 0
              : globalCount;

            return (
              <li className="filter-item" key={key}>
                <label className="filter-label">
                  <input
                    type="checkbox"
                    checked={categorySelectFilters.includes(key)}
                    onChange={() =>
                      dispatch(
                        setFilters({
                          value: key,
                          filters: "categorySelectFilters",
                        })
                      )
                    }
                  />
                  <span className="fs-lg">{key}</span>
                </label>

                {/* 🔥 показуємо актуальну кількість */}
                <span className="filter-count fs-md">({actualCount})</span>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
