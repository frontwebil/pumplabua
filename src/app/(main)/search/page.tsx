"use client";

import { Suspense } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs/Breadcrumbs";
import { HeroTemplateSmall } from "@/components/HeroTemplate/HeroTemplateSmall";
import { SearchResultsContainer } from "@/components/SearchResultsContainer/SearchResultsContainer";
import { useSearchParams } from "next/navigation";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") ?? "";

  return (
    <Suspense fallback={<div>завантаження...</div>}>
      <div>
        <HeroTemplateSmall title="Пошук" bgImage="/Account/bg.png" />
        <Breadcrumbs
          links={[
            { title: "Головна", href: "/" },
            { title: q ? `Пошук: ${q}` : "Пошук" },
          ]}
        />

        <SearchResultsContainer query={q} />
      </div>
    </Suspense>
  );
}
