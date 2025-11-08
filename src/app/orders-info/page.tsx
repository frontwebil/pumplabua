import { Breadcrumbs } from "@/components/Breadcrumbs/Breadcrumbs";
import { FooterBanner } from "@/components/FooterBanner/FooterBanner";
import { HeroTemplate } from "@/components/HeroTemplate/HeroTemplate";
import { PathToOrder } from "@/components/PathToOrder/PathToOrder";
import { TemplateWithImageLeft } from "@/components/Templates/TemplateWithImageLeft/TemplateWithImageLeft";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "",
  description: "",
};
export default function OrdersInfo() {
  return (
    <>
      <HeroTemplate
        title="Як Замовити"
        text="Підтримай своє тіло і розкрий потенціал з нашим спортивним харчуванням для кожного рівня"
        bgImage="/Order-page/Hero/bg.png"
      />
      <Breadcrumbs
        links={[{ title: "Головна", href: "/" }, { title: "Як Замовити" }]}
      />
      <PathToOrder />
      <TemplateWithImageLeft
        title={<span style={{ color: "#2858FF" }}>Гарантія та повернення</span>}
        img="/Order-page/girl-with-cup.png"
        alt="Гарантія та повернення"
        subTitle="Ми дбаємо про вашу впевненість у покупці"
        text="Уся наша продукція сертифікована та відповідає чинним стандартам якості. Якщо товар не відповідає вашим очікуванням або має виробничий дефект, ви можете повернути його протягом 14 днів згідно із Законом України «Про захист прав споживачів»."
      />
      <FooterBanner
        bgImage="/Order-page/footer-banner.png"
        title="pump lab — твоя сила, твій вибір!"
        subTitle="Ми цінуємо кожного, хто обирає рух уперед."
        text="Ти отримуєш не просто якісне спортивне харчування — ти обираєш впевненість, швидке замовлення та підтримку команди, яка завжди поруч."
      />
    </>
  );
}
