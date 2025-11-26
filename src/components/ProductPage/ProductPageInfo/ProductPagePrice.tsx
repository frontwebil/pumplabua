import { RootState } from "@/redux/pamplabua/store";
import { useDispatch, useSelector } from "react-redux";
import { ProductPageFuncButtons } from "./ProductPageFuncButtons";
import { addProductToOrders } from "@/redux/pamplabua/slices/orderSlice";
import { toggleIsOpenOrderModal } from "@/redux/pamplabua/slices/uiSlice";
import { toast } from "react-toastify";

export function ProductPagePrice() {
  const dispatch = useDispatch();

  const { currentProduct, quantityProduct, selectedVariant } = useSelector(
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
          className={`ProductPagePrice-row-addCart ${
            !selectedVariant.inStock && "not-active"
          }`}
          disabled={!selectedVariant.inStock}
          onClick={() => {
            if (!currentProduct) return;

            const productWithoutVariants = (({ variants, ...rest }) => rest)(
              currentProduct
            );
            dispatch(
              addProductToOrders({
                ...productWithoutVariants,
                selectedVariant,
                quantityProduct,
              })
            );
            toast.success("Товар додано до кошику!");
            dispatch(toggleIsOpenOrderModal());
          }}
        >
          {!selectedVariant.inStock ? "Немає в наявності" : "Додати у кошик"}
        </button>
        <ProductPageFuncButtons />
      </div>
    </div>
  );
}
