"use client";

import { setFilters } from "@/redux/pamplabua/slices/productsSlice";
import { RootState } from "@/redux/pamplabua/store";
import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

const CATEGORY_ORDER = [
  "Вітаміни та БАДи",
  "Протеїн",
  "Креатин",
  "Гейнер",
  "Хондропротектори",
  "Колаген",
  "Амінокислоти",
  "Жироспалювачі",
  "Здорове харчування",
  "Протеїнові батончики",
  "Аксесуари",
];

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
          {Object.entries(globalCategoryCount)
            .sort(([a], [b]) => {
              const indexA = CATEGORY_ORDER.indexOf(a);
              const indexB = CATEGORY_ORDER.indexOf(b);

              // якщо якоїсь категорії нема у списку — кидаємо вниз
              if (indexA === -1) return 1;
              if (indexB === -1) return -1;

              return indexA - indexB;
            })
            .map(([key, globalCount]) => {
              const actualCount = filterByProducer
                ? filteredCategoryCount[key] ?? 0
                : globalCount;

              return (
                <li className="filter-item" key={key}>
                  <label className="filter-label">
                    <input
                      type="checkbox"
                      checked={categorySelectFilters.includes(key)}
                      onChange={() => {
                        if (actualCount === 0) return;
                        dispatch(
                          setFilters({
                            value: key,
                            filters: "categorySelectFilters",
                          })
                        );
                      }}
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
