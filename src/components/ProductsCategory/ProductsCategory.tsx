import "@/components/ProductsCategory/ProductsCategory.css";

type ProductsCategoryType = {
  title: string;
  description: string;
  bgImage: string;
  link: string;
};

export function ProductsCategory() {
  const cards: ProductsCategoryType[] = [
    {
      title: "Набір м’язової маси",
      description:
        "Продукти для ефективного росту м’язів та швидкого відновлення",
      bgImage: "/Home/ProductsCategory/1.png",
      link: "",
    },
    {
      title: "Схуднення та жироспалювання",
      description:
        "Добавки, що прискорюють метаболізм і допомагають контролювати вагу",
      bgImage: "/Home/ProductsCategory/2.png",
      link: "",
    },
    {
      title: "Підвищення енергії та витривалості",
      description:
        "Предтренувальні та енергетичні формули для максимальних тренувань",
      bgImage: "/Home/ProductsCategory/3.png",
      link: "",
    },
    {
      title: "Відновлення та зниження втоми",
      description:
        "Амінокислоти та гейнери для швидкого відновлення після навантажень",
      bgImage: "/Home/ProductsCategory/4.png",
      link: "",
    },
  ];

  return (
    <section className="productsCategory container">
      {cards.map((card, i) => (
        <div className="" key={i}>
          <div
            className="productsCategory-card"
            style={{ backgroundImage: `url(${card.bgImage})` }}
          >
            <div className="productsCategory-card-text">
              <h2 className="fs-xl font-bold uppercase">{card.title}</h2>
              <p className="fs-lg">{card.description}</p>
            </div>
          </div>
          <div className="productsCategory-link fs-md">Перейти</div>
        </div>
      ))}
    </section>
  );
}
