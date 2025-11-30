"use client";

import {
  setFilters,
  UNIT_LABELS,
} from "@/redux/pamplabua/slices/productsSlice";
import { RootState } from "@/redux/pamplabua/store";
import { useSelector, useDispatch } from "react-redux";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useState } from "react";

function formatWeight(value: string) {
  const match = value.match(/^(\d+(?:\.\d+)?)([a-zA-Z]+)$/);
  if (!match) return value;

  const [, amount, unit] = match;

  return `${amount} ${UNIT_LABELS[unit] || unit}`;
}

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

  const shouldShowWeightFilter =
    categorySelectFilters.length > 0 || producerSelectFilter.length > 0;

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

            if (actualCount === 0) return null;

            const isChecked = weightSelectFilter.includes(weightKey);

            console.log(weightKey);

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
                  <span className="fs-lg">{formatWeight(weightKey)}</span>
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
