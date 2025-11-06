import "@/components/Hero/Hero.css";
import { SITE_LINKS } from "@/site-config/site.config";
import Link from "next/link";

export function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-text">
          <h1 className="fs-xxl uppercase font-bold">
            Харчування для <span style={{ color: "#FBF90D" }}>переможців</span>
          </h1>
          <p className="fs-xl">
            Підтримай своє тіло і досягай результатів з продуктами топових
            брендів спортивного харчування для будь-якого рівня підготовки
          </p>
          <Link href={SITE_LINKS.CATALOG} className="hero-choose-product fs-md">
            Обрати свій продукт
          </Link>
        </div>
      </div>
    </section>
  );
}
