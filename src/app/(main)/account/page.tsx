"use client";

import { AccountContent } from "@/components/AccountComponents/AccountContent";
import { Breadcrumbs } from "@/components/Breadcrumbs/Breadcrumbs";
import { HeroTemplateSmall } from "@/components/HeroTemplate/HeroTemplateSmall";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AccountPage() {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session || session.status == "unauthenticated") {
      router.replace("/");
    }
  }, [session, router]);

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
