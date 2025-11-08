import { Advantages } from "@/components/Advantages/Advantages";
import { Breadcrumbs } from "@/components/Breadcrumbs/Breadcrumbs";
import { FooterBanner } from "@/components/FooterBanner/FooterBanner";
import { HeroTemplate } from "@/components/HeroTemplate/HeroTemplate";
import { TemplateWithImageLeft } from "@/components/Templates/TemplateWithImageLeft/TemplateWithImageLeft";
import { TemplateWithImageRight } from "@/components/Templates/TemplateWithImageRight/TemplateWithImageRight";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "",
  description: "",
};

export default function AboutPage() {
  return (
    <>
      <HeroTemplate
        title="Про Нас"
        text="Підтримай своє тіло і розкрий потенціал з нашим спортивним харчуванням для кожного рівня"
        bgImage="/About/Hero/bg.png"
      />
      <Breadcrumbs
        links={[{ title: "Головна", href: "/" }, { title: "Про нас" }]}
      />
      <TemplateWithImageLeft
        img="/About/Images/woman-with-cup.png"
        title={
          <>
            <span style={{ color: "#2858FF" }}>PUMP LAB</span> — енергія, що
            піднімає твої результати!
          </>
        }
        alt="Енергія що підіймає твої результати"
        subTitle="Поринь у світ активних досягнень разом із Pump Lab!"
        text="Наше спортивне харчування не просто підтримує твої тренування — воно заряджає енергією, стимулює обмін речовин і допомагає тілу відновлюватися швидше, ніж будь-коли."
      />
      <Advantages />
      <TemplateWithImageRight
        img="/About/Images/man-with-cup.png"
        title={
          <>
            <span style={{ color: "#2858FF" }}>PUMP LAB</span> — енергія, що
            піднімає твої результати!
          </>
        }
        alt="Енергія що підіймає твої результати"
        subTitle="Поринь у світ активних досягнень разом із Pump Lab!"
        text="Наше спортивне харчування не просто підтримує твої тренування — воно заряджає енергією, стимулює обмін речовин і допомагає тілу відновлюватися швидше, ніж будь-коли."
      />
      <FooterBanner
        bgImage="/About/Images/Footer-banner-bg.png"
        title="pump lab — твоя сила, твій вибір!"
        subTitle="Ми цінуємо кожного, хто обирає рух уперед."
        text="Ти отримуєш не просто якісне спортивне харчування — ти обираєш впевненість, швидке замовлення та підтримку команди, яка завжди поруч."
      />
    </>
  );
}
