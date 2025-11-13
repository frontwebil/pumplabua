import { AccauntOrdersContent } from "@/components/AccountComponents/AccauntOrdersContent";
import { Breadcrumbs } from "@/components/Breadcrumbs/Breadcrumbs";
import { HeroTemplateSmall } from "@/components/HeroTemplate/HeroTemplateSmall";

export default function page() {
  return (
    <>
      <HeroTemplateSmall
        title="Персональний акаунт"
        bgImage="/Account/bg.png"
      />
      <Breadcrumbs
        links={[{ title: "Головна", href: "/" }, { title: "Користувач" }]}
      />
      <AccauntOrdersContent />
    </>
  );
}
