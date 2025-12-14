"use client";

import { RootState } from "@/redux/pamplabua/store";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { toggleDiscountOnly } from "@/redux/pamplabua/slices/productsSlice";

export function DiscountProductHandler() {
  const dispatch = useDispatch();
  const { filteredProducts, discountOnly } = useSelector(
    (s: RootState) => s.productsSlice
  );

  const [open, setOpen] = useState(true);

  const productsWithDiscount = filteredProducts.filter((el) => {
    const mainVariant = el.variants.find((e) => e.isMain);
    return mainVariant && mainVariant.discount && mainVariant.discount > 0;
  });

  if (productsWithDiscount.length === 0) return null;

  return (
    <>
      <div className="filter-group-header" onClick={() => setOpen(!open)}>
        <p className="fs-lg font-bold uppercase">Знижки</p>
        <MdKeyboardArrowDown
          className={`filter-arrow ${open ? "open" : ""}`}
          size={20}
        />
      </div>

      {open && (
        <ul className="filter-list">
          <li className={`filter-item ${discountOnly ? "active" : ""}`}>
            <label className="filter-label">
              <input
                type="checkbox"
                checked={discountOnly}
                onChange={() => dispatch(toggleDiscountOnly())}
              />
              <span className="fs-lg text-red-500 font-bold">Акція</span>
            </label>

            <span className="filter-count fs-md">
              ({productsWithDiscount.length})
            </span>
          </li>
        </ul>
      )}
    </>
  );
}
