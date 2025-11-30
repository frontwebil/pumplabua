"use client";

import { closeOrderModal } from "@/redux/pamplabua/slices/uiSlice";
import { RootState } from "@/redux/pamplabua/store";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export function OrderModalPrice() {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { orderProducts, delivery } = useSelector(
    (store: RootState) => store.OrderProductsSlice
  );

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

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

  const deliveryPrice =
    totalPriceWithDiscount > 3000 ? "Безкоштовно" : "Від 60 грн";
  const handleOrder = () => {
    if (orderProducts.length < 1) {
      toast("Ваша корзина порожня");
      return;
    }
    router.replace("/order");
    dispatch(closeOrderModal());
  };

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
        {delivery !== "Самовивіз" && (
          <div className="order-total-price-content-row">
            <p className="order-total-price-content-row-text">Доставка</p>
            <p className="order-total-price-content-count">{deliveryPrice}</p>
          </div>
        )}
        {pathname !== "/order" && (
          <p className="order-total-free-delivery">
            <span className="font-bold">Безкоштовна доставка</span> замовлень
            сумою від 3 000 грн
          </p>
        )}
      </div>
      <div className="order-total-price-total">
        <h4>Разом</h4>
        <p>{totalPriceWithDiscount} грн</p>
      </div>
      {pathname !== "/order" && (
        <button
          className="order-total-go-to-order-page"
          onClick={() => {
            handleOrder();
          }}
        >
          Перейти до оформлення
        </button>
      )}
    </div>
  );
}
