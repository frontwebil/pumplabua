import "@/components/WhyChoose/WhyChoose.css";

type WhyChooseCard = {
  title: string;
  description: string;
};

export function WhyChoose() {
  const WhyChooseCards: WhyChooseCard[] = [
    {
      title: "Висока якість",
      description: "сертифіковані та безпечні продукти, яким можна довіряти",
    },
    {
      title: "Різноманітний асортимент",
      description:
        "протеїни, амінокислоти, енергетичні батончики та топові добавки",
    },
    {
      title: "Підтримка експертів",
      description: "завжди готові порадити та допомогти з підбором продуктів",
    },
    {
      title: "Гнучкі умови",
      description: "оптові ціни, бонуси та програми лояльності",
    },
    {
      title: "Швидка доставка",
      description: "по всій Україні та за кордон",
    },
  ];

  return (
    <section className="WhyChoose">
      <div className="container">
        <h2 className="fs-xxl font-bold uppercase">
          Чому обирають{" "}
          <span style={{ color: "#FBF90D", whiteSpace: "nowrap" }}>
            Pump Lab
          </span>
        </h2>
        <div className="WhyChoose-cards">
          {WhyChooseCards.map((card, i) => {
            return (
              <div className="WhyChoose-card" key={i}>
                <h3 className="fs-lg font-bold">{card.title}</h3>
                <p className="fs-sm font-semibold">{card.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
