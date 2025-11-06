import "@/components/ProductCard/ProductCard.css";
import Image from "next/image";

export function ProductCard() {
  return (
    <div className="product-card">
      <Image src={"/Products/whey.png"} alt="whey" width={200} height={200} />
      <p className="product-card-category">Protein</p>
      <h2 className="product-card-title">
        Сироватковий протеїн Optimum Nutrition
      </h2>
      <h3 className="product-card-price">750грн</h3>
    </div>
  );
}
