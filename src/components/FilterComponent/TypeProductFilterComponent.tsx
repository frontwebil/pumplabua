"use client";

import { RootState } from "@/redux/pamplabua/store";
import { setFilters } from "@/redux/pamplabua/slices/productsSlice";
import { useSelector, useDispatch } from "react-redux";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useState } from "react";

export function TypeProductFilterComponent() {
  const { filteredTypeCount, typeSelectFilter, categorySelectFilters } =
    useSelector((s: RootState) => s.productsSlice);

  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);

  // ✅ НЕ ПОКАЗУЄМО без категорії
  if (!categorySelectFilters.length) return null;

  const types = Object.entries(filteredTypeCount);

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
          {types.map(([type, count]) => {
            const isChecked = typeSelectFilter.includes(type);

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
