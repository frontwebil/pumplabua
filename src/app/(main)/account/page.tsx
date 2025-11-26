"use client";

import { AccountContent } from "@/components/AccountComponents/AccountContent";
import { Breadcrumbs } from "@/components/Breadcrumbs/Breadcrumbs";
import { HeroTemplateSmall } from "@/components/HeroTemplate/HeroTemplateSmall";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AccountPage() {
  const { data, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/");
    }
  }, [status, router]);

  return (
    <>
      <HeroTemplateSmall
        title="Персональний акаунт"
        bgImage="/Account/bg.png"
      />
      <Breadcrumbs
        links={[{ title: "Головна", href: "/" }, { title: "Користувач" }]}
      />
      <AccountContent />
    </>
  );
}
