import { RootState } from "@/redux/pamplabua/store";
import { useSelector } from "react-redux";

export function OrderModalPrice() {
  const { orderProducts } = useSelector(
    (store: RootState) => store.OrderProductsSlice
  );

  const totalPriceWithoutDiscount = orderProducts.reduce(
    (sum, el) => (sum += el.quantityProduct * el.selectedVariant.price),
    0
  );

  const totalPriceWithDiscount = orderProducts.reduce((sum, el) => {
    const { price, discount } = el.selectedVariant;

    const finalPrice =
      discount && discount > 0
        ? Math.ceil(price - price * (discount / 100))
        : price;

    return sum + finalPrice * el.quantityProduct;
  }, 0);

  const differencePrice = totalPriceWithoutDiscount - totalPriceWithDiscount;

  const deliveryPrice = totalPriceWithDiscount > 3000 ? 0 : 89;

  return (
    <div className="order-total-price">
      <h3 className="order-total-price-title">Підсумок замовлення</h3>
      <div className="order-total-price-content">
        <div className="order-total-price-content-row">
          <p className="order-total-price-content-row-text">Замовлення</p>
          <p className="order-total-price-content-count">
            {totalPriceWithDiscount} грн
          </p>
        </div>
        <div className="order-total-price-content-row">
          <p className="order-total-price-content-row-text">Сума знижки</p>
          <p className="order-total-price-content-count">
            {differencePrice} грн
          </p>
        </div>
        <div className="order-total-price-content-row">
          <p className="order-total-price-content-row-text">Доставка</p>
          <p className="order-total-price-content-count">{deliveryPrice} грн</p>
        </div>
        <p className="order-total-free-delivery">
          <span className="font-bold">Безкоштовна доставка</span> замовлень
          сумою від 3 000 грн
        </p>
      </div>
      <div className="order-total-price-total">
        <h4>Разом</h4>
        <p>{totalPriceWithDiscount + deliveryPrice} грн</p>
      </div>
      <div className="order-total-go-to-order-page">Перейти до оформлення</div>
    </div>
  );
}
