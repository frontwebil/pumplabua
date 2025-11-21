import "@/components/ProductPage/ProductPageInfo/ProductPageInfo.css";
import { RootState } from "@/redux/pamplabua/store";
import { useSelector } from "react-redux";
import { ProductVariantSelector } from "./ProductVariantSelector";
import { ProductPagePrice } from "./ProductPagePrice";

export function ProductPageInfo() {
  const { currentProduct } = useSelector(
    (store: RootState) => store.productPageSlice
  );

  return (
    <div className="ProductPageInfo">
      <h1 className="ProductPageInfo-title">{currentProduct?.name}</h1>
      <h2 className="ProductPageInfo-catagory-producer">
        {currentProduct?.category} / {currentProduct?.producer}
      </h2>
      <p className="productPageInfo-short-decsription">
        {currentProduct?.mainDescription}
      </p>
      <ProductVariantSelector />
      <ProductPagePrice />
    </div>
  );
}
