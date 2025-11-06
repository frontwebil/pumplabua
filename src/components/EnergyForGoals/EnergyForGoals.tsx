import "@/components/EnergyForGoals/EnergyForGoals.css";

export function EnergyForGoals() {
  return (
    <section className="EnergyForGoals">
      <div className="container">
        <div className="EnergyForGoals-text">
          <h2 className="fs-xxl uppercase font-bold">
            <span style={{ color: "#2858FF" }}>PUMP LAB</span> — заряд енергії
            для <span style={{ color: "#FBF90D" }}>твоїх досягнень!</span>
          </h2>
          <h3 className="font-bold fs-xl">
            Ми — новий український бренд спортивного харчування, створений для
            тих, хто прагне максимуму у спорті, житті та бізнесі.
          </h3>
          <p className="fs-lg">
            Наші продукти допомагають підвищити продуктивність, прискорити
            відновлення та досягати результатів швидше.
          </p>
        </div>
      </div>
    </section>
  );
}
