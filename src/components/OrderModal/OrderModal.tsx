"use client";

import "@/components/OrderModal/OrderModal.css";
import {
  addProductToOrders,
  addQuantityProduct,
  removeQuantityProduct,
} from "@/redux/pamplabua/slices/orderSlice";
import { closeOrderModal } from "@/redux/pamplabua/slices/uiSlice";
import { RootState } from "@/redux/pamplabua/store";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { CgClose } from "react-icons/cg";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

export function OrderModal() {
  const { isOpenOrderModal } = useSelector((store: RootState) => store.uiSlice);
  const { orderProducts } = useSelector(
    (store: RootState) => store.OrderProductsSlice
  );
  const dispatch = useDispatch();
  const Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpenOrderModal) {
      document.body.classList.add("body-no-scroll");
    } else {
      document.body.classList.remove("body-no-scroll");
    }

    return () => {
      document.body.classList.remove("body-no-scroll");
    };
  }, [isOpenOrderModal]);

  return (
    <>
      {isOpenOrderModal && (
        <div
          className="OrderModal-container"
          onClick={(e) => {
            if (Ref.current && !Ref.current.contains(e.target as Node)) {
              dispatch(closeOrderModal());
            }
          }}
        >
          <div className="OrderModal">
            <div className="OrderModal-wrapper" ref={Ref}>
              <div className="OrderModal-top">
                <h3 className="fs-xl font-bold uppercase">Кошик</h3>
                <CgClose onClick={() => dispatch(closeOrderModal())} />
              </div>
              <span className="OrderModal-count-products">
                Додано 3 продукти
              </span>
              {orderProducts.length > 0 ? (
                <div className="OrderModal-content-container">
                  <div className="OrderModal-products-list">
                    <div className="OrderModal-products-row-container">
                      <div className="OrderModal-products-row product">
                        <p className="fs-md font-bold uppercase">Продукт</p>
                      </div>
                      <div className="OrderModal-products-row counts">
                        <p className="fs-md font-bold uppercase">Кількість</p>
                      </div>
                      <div className="OrderModal-products-row price">
                        <p className="fs-md font-bold uppercase">Вартість</p>
                      </div>
                    </div>
                  </div>
                  {orderProducts.map((el, i) => (
                    <div
                      className="OrderModal-products-list"
                      key={el.selectedVariant.id}
                    >
                      <div className="OrderModal-products-row-container">
                        <div className="OrderModal-products-row product">
                          <div className="OrderModal-product-wrapper">
                            <Image
                              src={el.selectedVariant.images[0]}
                              alt={el.name}
                              width={100}
                              height={100}
                            />
                            <div className="OrderModal-product-wrapper-text">
                              <h3 className="OrderModal-product-wrapper-text-title">
                                {el.name} / {el.producer}
                              </h3>
                              <p className="OrderModal-product-wrapper-text-taste">
                                Смак: {el.selectedVariant.flavor}
                              </p>
                              <p className="OrderModal-product-wrapper-text-weight">
                                {el.selectedVariant.amount}{" "}
                                {el.selectedVariant.unitType}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="OrderModal-products-row counts">
                          <div className="OrderModal-count-product">
                            <FaMinus
                              className="OrderModal-count-funcional"
                              onClick={() => {
                                dispatch(removeQuantityProduct(i));
                              }}
                            />
                            <p className="OrderModal-count-number">
                              {el.quantityProduct}
                            </p>
                            <FaPlus
                              className="OrderModal-count-funcional"
                              onClick={() => {
                                dispatch(addQuantityProduct(i));
                              }}
                            />
                          </div>
                        </div>
                        <div className="OrderModal-products-row price">
                          <span className="OrderModal-price">
                            {el.selectedVariant.price * el.quantityProduct} грн
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="OrderModal-list-empty">
                  <div className="empty-box">
                    <p>Ваш кошик порожній</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
