import "@/components/CatalogCards/CatalogCards.css";
import { ProductCard } from "../ProductCard/ProductCard";
import { Spinner } from "../Spinner/Spinner";
import { Product, Variant } from "@prisma/client";

type ProductType = {
  variants: Variant[];
} & Product;

export function CatalogCards({ products }: { products: ProductType[] }) {
  if (!products)
    return (
      <div className="Spinner-container">
        <Spinner />
      </div>
    );
  return (
    <div className="catalog-cards-container">
      <div className="catalog-cards-container-top">
        <div className="catalog-cards-container-top-left">
          <h2 className="fs-xl font-bold uppercase">уся продукція</h2>
          <span className="fs-sm " style={{ color: "#4F5052" }}>
            Показано {products.length}/{products.length}
          </span>
        </div>
      </div>
      <div className="catalog-cards">
        {products.map((product: ProductType) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
