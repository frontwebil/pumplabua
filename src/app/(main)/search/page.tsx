"use client";

import { Suspense } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs/Breadcrumbs";
import { HeroTemplateSmall } from "@/components/HeroTemplate/HeroTemplateSmall";
import { SearchResultsContainer } from "@/components/SearchResultsContainer/SearchResultsContainer";
import { useSearchParams } from "next/navigation";

function SearchContent() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") ?? "";

  return (
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
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>завантаження...</div>}>
      <SearchContent />
    </Suspense>
  );
}
