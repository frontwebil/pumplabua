"use client";

import "@/components/CatalogContainer/CatalogContainer.css";
import "./SearchResultsContainer.css";
import { useProducts } from "@/custom-hooks/fetchProducts";
import { CatalogCards } from "@/components/CatalogCards/CatalogCards";
import { useMemo } from "react";
import { Product, Variant } from "@prisma/client";

type ProductType = Product & { variants: Variant[] };

function normalize(s: unknown): string {
  return typeof s === "string" ? s.toLowerCase().trim() : "";
}

function includesQuery(haystack: unknown, q: string) {
  const text = normalize(haystack);
  return text.length > 0 && text.includes(q);
}

export function SearchResultsContainer({ query }: { query: string }) {
  const { data: products } = useProducts();
  const q = normalize(query);

  const searchedProducts: ProductType[] = useMemo(() => {
    const list = (products ?? []) as ProductType[];
    if (!q) return [];

    return list.filter((p) => {
      if (includesQuery(p.name, q)) return true;
      if (includesQuery(p.producer, q)) return true;
      if (includesQuery(p.category, q)) return true;
      if (includesQuery(p.type, q)) return true;

      if (includesQuery(p.mainDescription, q)) return true;
      if (includesQuery(p.description, q)) return true;
      if (includesQuery(p.features, q)) return true;
      if (includesQuery(p.purpose, q)) return true;
      if (includesQuery(p.components, q)) return true;
      if (includesQuery(p.additional, q)) return true;

      // also search in variants (e.g. flavor)
      if (Array.isArray(p.variants)) {
        return p.variants.some((v) => includesQuery(v.flavor, q));
      }
      return false;
    });
  }, [products, q]);

  const title = query ? `Результати пошуку: ${query}` : "Пошук";

  return (
    <div className="catalog-container search-results-page">
      <CatalogCards
        products={searchedProducts}
        title={title}
        showFiltersUi={false}
        enablePagination={false}
        emptyText={query ? "За вашим запитом нічого не знайдено" : "Введіть запит для пошуку"}
      />
    </div>
  );
}

