"use client";

import { Breadcrumbs } from "@/components/Breadcrumbs/Breadcrumbs";
import { FavoritesCatalog } from "@/components/FavoritesCatalog/FavoritesCatalog";
import { HeroTemplateSmall } from "@/components/HeroTemplate/HeroTemplateSmall";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function FavoritesPage() {
  const { status } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/");
    }
  }, [status, router]);

  return (
    <div>
      <HeroTemplateSmall
        title="Збережені"
        bgImage="/Favorites/favorites-bg.png"
      />
      <Breadcrumbs
        links={[{ title: "Головна", href: "/" }, { title: "Збережені" }]}
      />
      <FavoritesCatalog/>
    </div>
  );
}
