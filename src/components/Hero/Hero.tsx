import "@/components/Hero/Hero.css";

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
          <div className="hero-choose-product fs-md">Обрати свій продукт</div>
        </div>
      </div>
    </section>
  );
}
