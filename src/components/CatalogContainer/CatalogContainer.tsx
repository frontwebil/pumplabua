import { useProducts } from "@/custom-hooks/fetchProducts";
import { CatalogCards } from "../CatalogCards/CatalogCards";
import { FilterComponent } from "../FilterComponent/FilterComponent";
import "@/components/CatalogContainer/CatalogContainer.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setProducts } from "@/redux/pamplabua/slices/productsSlice";
import { RootState } from "@/redux/pamplabua/store";

export function CatalogContainer() {
  const { data: products } = useProducts();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setProducts(products));
  }, [dispatch, products]);

  const { filteredProducts } = useSelector(
    (store: RootState) => store.productsSlice
  );

  const currentProducts =
    filteredProducts.length < 1 ? products : filteredProducts;

  return (
    <>
      <div className="catalog-container">
        <FilterComponent />
        <CatalogCards products={currentProducts} />
      </div>
    </>
  );
}
