import "@/components/ProductPage/ProductPageInfo/ProductPageInfo.css";
import { RootState } from "@/redux/pamplabua/store";
import { useState } from "react";
import { useSelector } from "react-redux";

export function ProductPageDescriptionInfo() {
  const { currentProduct } = useSelector(
    (store: RootState) => store.productPageSlice
  );

  const [activeTab, setActiveTab] = useState(0);

  if (!currentProduct) return null;

  const tabs = [
    {
      title: "Опис",
      text: currentProduct.description,
    },
    {
      title: "Особливості",
      text: currentProduct.features,
    },
    {
      title: "Для чого?",
      text: currentProduct.purpose,
    },
    {
      title: "Компоненти",
      text: currentProduct.components,
    },
    {
      title: "Додатково",
      text: currentProduct.additional,
    },
  ];
  return (
    <div className="ProductPageDescriptionInfo">
      <div className="ProductPageDescriptionInfo-content-titles">
        {tabs.map((el, i) => (
          <div
            className={`ProductPageDescriptionInfo-content-title ${
              activeTab == i ? "active" : ""
            }`}
            key={el.title}
            onClick={() => setActiveTab(i)}
          >
            {el.title}
          </div>
        ))}
      </div>
      <div
        className="ProductPageDescriptionInfo-content-text"
        style={{ whiteSpace: "pre-wrap" }}
      >
        {tabs[activeTab].text!.length > 1
          ? tabs[activeTab].text
          : "Інформація відстутня"}
      </div>
    </div>
  );
}
