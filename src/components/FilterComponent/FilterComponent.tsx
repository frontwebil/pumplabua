"use client";
import "@/components/FilterComponent/FilterComponent.css";
import { ProductionFilterComponent } from "./ProductionFilterComponent";
import { ProducerFilterComponent } from "./ProducerFilterComponent";
import { WeightFilterComponent } from "./WeightFilterComponent";
import { SelectedFilters } from "./SelectedFilters";

export function FilterComponent() {
  return (
    <div className="filter-group">
      <h2 className="fs-lg font-bold uppercase">Фільтр</h2>
      <SelectedFilters />
      <ProductionFilterComponent />
      <ProducerFilterComponent />
      <WeightFilterComponent />
    </div>
  );
}
