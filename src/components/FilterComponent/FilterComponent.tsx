"use client";
import "@/components/FilterComponent/FilterComponent.css";
import { ProductionFilterComponent } from "./ProductionFilterComponent";
import { ProducerFilterComponent } from "./ProducerFilterComponent";
import { WeightFilterComponent } from "./WeightFilterComponent";
import { SelectedFilters } from "./SelectedFilters";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/pamplabua/store";
import { CgClose } from "react-icons/cg";
import { toogleIsOpenMobileFilter } from "@/redux/pamplabua/slices/uiSlice";
import { useEffect } from "react";
import { resetFilters } from "@/redux/pamplabua/slices/productsSlice";

export function FilterComponent() {
  const { isOpenMobileFilter } = useSelector(
    (store: RootState) => store.uiSlice
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (isOpenMobileFilter) {
      document.body.classList.add("body-no-scroll");
    } else {
      document.body.classList.remove("body-no-scroll");
    }

    return () => {
      document.body.classList.remove("body-no-scroll");
    };
  }, [isOpenMobileFilter]);

  return (
    <>
      {isOpenMobileFilter && (
        <div
          className="filter-backdrop"
          onClick={() => dispatch(toogleIsOpenMobileFilter())}
        />
      )}
      <div
        className={`filter-group ${
          isOpenMobileFilter ? "active-mobile-filter" : ""
        }`}
      >
        <div className="filter-top flex justify-between items-center">
          <h2 className="fs-lg font-bold uppercase">фільтр</h2>
          <CgClose
            className="filter-top-mobile-close"
            size={24}
            onClick={() => {
              dispatch(toogleIsOpenMobileFilter());
            }}
          />
        </div>
        <SelectedFilters />
        <ProductionFilterComponent />
        <ProducerFilterComponent />
        <WeightFilterComponent />
        <div
          className="filter-button-search-mobile"
          onClick={() => dispatch(toogleIsOpenMobileFilter())}
        >
          Шукати
        </div>
        <p
          className="fs-md underline text-center"
          onClick={() => dispatch(resetFilters())}
        >
          Скинути фільтр
        </p>
      </div>
    </>
  );
}
