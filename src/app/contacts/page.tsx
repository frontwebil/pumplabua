import { Breadcrumbs } from "@/components/Breadcrumbs/Breadcrumbs";
import { ContactMap } from "@/components/ContactMap/ContactMap";
import { Contacts } from "@/components/Contacts/Contacts";
import { FooterBanner } from "@/components/FooterBanner/FooterBanner";
import { HeroTemplate } from "@/components/HeroTemplate/HeroTemplate";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Контакти",
  description: "",
};

export default function ContactsPage() {
  return (
    <>
      <HeroTemplate
        title="Контакти"
        text="Підтримай своє тіло і розкрий потенціал з нашим спортивним харчуванням для кожного рівня"
        bgImage="/Contacts/hero-bg.png"
      />
      <Breadcrumbs
        links={[{ title: "Головна", href: "/" }, { title: "Контакти" }]}
      />
      <Contacts />
      <ContactMap />
      <FooterBanner
        bgImage="/Contacts/Footer-banner.png"
        title="pump lab — твоя сила, твій вибір!"
        text="Ти отримуєш не просто якісне спортивне харчування — ти обираєш впевненість, швидке замовлення та підтримку команди, яка завжди поруч."
        subTitle="Ми цінуємо кожного, хто обирає рух уперед."
      />
    </>
  );
}
