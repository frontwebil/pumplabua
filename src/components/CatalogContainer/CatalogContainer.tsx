import { useProducts } from "@/custom-hooks/fetchProducts";
import { CatalogCards } from "../CatalogCards/CatalogCards";
import { FilterComponent } from "../FilterComponent/FilterComponent";
import "@/components/CatalogContainer/CatalogContainer.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setProducts } from "@/redux/pamplabua/slices/productsSlice";

export function CatalogContainer() {
  const { data: products } = useProducts();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setProducts(products));
  }, [dispatch, products]);

  return (
    <>
      <div className="catalog-container">
        <FilterComponent />
        <CatalogCards products={products} />
      </div>
    </>
  );
}
