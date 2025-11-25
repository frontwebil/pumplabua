import { Suspense } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs/Breadcrumbs";
import { CatalogContainer } from "@/components/CatalogContainer/CatalogContainer";
import { HeroTemplateSmall } from "@/components/HeroTemplate/HeroTemplateSmall";

export default function CatalogPage() {
  return (
    <div>
      <HeroTemplateSmall title="Каталог" bgImage="/Account/bg.png" />
      <Breadcrumbs
        links={[{ title: "Головна", href: "/" }, { title: "Увесь Каталог" }]}
      />

      <Suspense fallback={<div>завантаження...</div>}>
        <CatalogContainer />
      </Suspense>
    </div>
  );
}
