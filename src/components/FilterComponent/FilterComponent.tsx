"use client";
import { useState } from "react";
import "@/components/FilterComponent/FilterComponent.css";
import { MdKeyboardArrowDown } from "react-icons/md";
import { ProductionFilterComponent } from "./ProductionFilterComponent";

export function FilterComponent() {
  return (
    <div className="filter-group">
      <h2 className="fs-lg font-bold uppercase">Фільтр</h2>

      <ProductionFilterComponent />
    </div>
  );
}
