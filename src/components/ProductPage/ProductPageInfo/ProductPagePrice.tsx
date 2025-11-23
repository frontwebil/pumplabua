import { RootState } from "@/redux/pamplabua/store";
import { useSelector } from "react-redux";
import { ProductPageFuncButtons } from "./ProductPageFuncButtons";

export function ProductPagePrice() {
  const { quantityProduct, selectedVariant } = useSelector(
    (store: RootState) => store.productPageSlice
  );

  if (!selectedVariant) return null;

  const price = quantityProduct * selectedVariant.price;
  const hasDiscount =
    selectedVariant.discount && selectedVariant.discount > 0 ? true : false;
  const actualPrice = hasDiscount
    ? Math.ceil(price - price * (selectedVariant.discount! / 100))
    : price;
  return (
    <div className={`ProductPagePrice`}>
      <h2 className="ProductPagePrice-delivery">
        БЕЗКОШТОВНА доставка замовлень від 3.000 грн
      </h2>

      <div className="ProductPagePrice-row">
        <div
          className={`ProductPagePrice-row-price ${
            hasDiscount && "has-discount"
          }`}
        >
          {hasDiscount ? (
            <span className="ProductPagePrice-row-oldprice">{price} грн</span>
          ) : (
            ""
          )}{" "}
          {actualPrice} ГРН
        </div>
        <button
          className={`ProductPagePrice-row-addCart ${!selectedVariant.inStock && "not-active"}`}
          disabled={!selectedVariant.inStock}
        >
          {!selectedVariant.inStock ? "Немає в наявності" : "Додати у кошик"}
        </button>
        <ProductPageFuncButtons />
      </div>
    </div>
  );
}
