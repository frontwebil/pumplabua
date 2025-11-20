"use client";
import { useState } from "react";
import "@/components/FilterComponent/FilterComponent.css";
import { MdKeyboardArrowDown } from "react-icons/md";

export function FilterComponent() {
  const [open, setOpen] = useState(true);
  // const [checked, setChecked] = useState<Record<string, boolean>>({});

  return (
    <div className="filter-group">
      <h2 className="fs-lg font-bold uppercase">Фільтр</h2>
      <div className="filter-group-header" onClick={() => setOpen(!open)}>
        <p className="fs-lg font-bold uppercase">Продукція</p>
        <MdKeyboardArrowDown
          className={`filter-arrow ${open ? "open" : ""}`}
          size={20}
        />
      </div>

      {open && (
        <ul className="filter-list">
          <li className="filter-item">
            <label className="filter-label">
              <input type="checkbox" />
              <span className="fs-lg">Протеїнові батончики</span>
            </label>
            <span className="filter-count fs-md">(20)</span>
          </li>
          <li className="filter-item">
            <label className="filter-label">
              <input type="checkbox" />
              <span className="fs-lg">Здорове харчування</span>
            </label>
            <span className="filter-count fs-md">(20)</span>
          </li>
          <li className="filter-item">
            <label className="filter-label">
              <input type="checkbox" />
              <span className="fs-lg">Протеїн</span>
            </label>
            <span className="filter-count fs-md">(20)</span>
          </li>
        </ul>
      )}
    </div>
  );
}
