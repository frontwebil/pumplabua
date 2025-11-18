"use client";

import {
  toggleActive,
  toggleBestseller,
} from "@/redux/admin/slices/addProductFormSlice";
import { RootState } from "@/redux/admin/store";
import { useDispatch, useSelector } from "react-redux";

export default function ToggleActiveBestSeller() {
  const { isActive, isBestseller } = useSelector(
    (store: RootState) => store.addProductFormSlice
  );

  const dispatch = useDispatch();

  return (
    <div className="flex flex-col gap-4 mb-5">
      <label className="flex items-center cursor-pointer select-none">
        <input
          type="checkbox"
          checked={isActive}
          onChange={() => dispatch(toggleActive())}
          className="sr-only" // ховаємо стандартний чекбокс
        />
        <div
          className={`
            w-10 h-5 flex items-center bg-gray-300 rounded-full p-1 
            transition-colors duration-300
            ${isActive ? "bg-green-500" : "bg-gray-300"}
          `}
        >
          <div
            className={`
              bg-white w-4 h-4 rounded-full shadow-md transform 
              transition-transform duration-300
              ${isActive ? "translate-x-5" : "translate-x-0"}
            `}
          />
        </div>
        <span className="ml-3 text-gray-700 font-medium">Активний</span>
      </label>

      {/* Хіт продажів */}
      <label className="flex items-center cursor-pointer select-none">
        <input
          type="checkbox"
          checked={isBestseller}
          onChange={() => dispatch(toggleBestseller())}
          className="sr-only"
        />
        <div
          className={`
            w-10 h-5 flex items-center bg-gray-300 rounded-full p-1 
            transition-colors duration-300
            ${isBestseller ? "bg-yellow-400" : "bg-gray-300"}
          `}
        >
          <div
            className={`
              bg-white w-4 h-4 rounded-full shadow-md transform 
              transition-transform duration-300
              ${isBestseller ? "translate-x-5" : "translate-x-0"}
            `}
          />
        </div>
        <span className="ml-3 text-gray-700 font-medium">Хіт продажів</span>
      </label>
    </div>
  );
}
