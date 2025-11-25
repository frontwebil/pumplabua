import "@/components/ProductsCategory/ProductsCategory.css";
import { setFiltersFromLink } from "@/redux/pamplabua/slices/productsSlice";
import { SITE_LINKS } from "@/site-config/site.config";
import Link from "next/link";
import { useDispatch } from "react-redux";

type ProductsCategoryType = {
  title: string;
  description: string;
  bgImage: string;
  filters: string[];
};

export function ProductsCategory() {
  const dispatch = useDispatch();
  const cards: ProductsCategoryType[] = [
    {
      title: "Набір м’язової маси",
      description:
        "Продукти для ефективного росту м’язів та швидкого відновлення",
      bgImage: "/Home/ProductsCategory/1.png",
      filters: ["Протеїн", "Креатин"],
    },
    {
      title: "Схуднення та жироспалювання",
      description:
        "Добавки, що прискорюють метаболізм і допомагають контролювати вагу",
      bgImage: "/Home/ProductsCategory/2.png",
      filters: ["Жироспалювачі"],
    },
    {
      title: "Підвищення енергії та витривалості",
      description:
        "Предтренувальні та енергетичні формули для максимальних тренувань",
      bgImage: "/Home/ProductsCategory/3.png",
      filters: ["Амінокислоти", "Предтренувальні комплекси"],
    },
    {
      title: "Відновлення та зниження втоми",
      description:
        "Амінокислоти та гейнери для швидкого відновлення після навантажень",
      bgImage: "/Home/ProductsCategory/4.png",
      filters: ["Хондропротектори", "Амінокислоти"],
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
          <Link
            href={SITE_LINKS.CATALOG}
            className="productsCategory-link fs-md"
            onClick={() => dispatch(setFiltersFromLink(card.filters))}
          >
            Перейти
          </Link>
        </div>
      ))}
    </section>
  );
}
