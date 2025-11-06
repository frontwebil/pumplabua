import "@/components/Advantages/Advantages.css";

type Advantage = {
  title: string;
  description: string;
};

export function Advantages() {
  const advantages: Advantage[] = [
    {
      title: "Продукти для будь-яких цілей",
      description:
        "Від набору м’язової маси до швидкого відновлення — знайдеш все, що потрібно",
    },
    {
      title: "Енергія на кожен день",
      description:
        "Добавки допомагають підтримувати активність та концентрацію",
    },
    {
      title: "Професійний підбір",
      description:
        "Експерти допоможуть підібрати продукти саме для твоїх тренувань",
    },
    {
      title: "Партнерство та підтримка спорту",
      description:
        "Ми підтримуємо спорт в Україні: змагання, чемпіонати та спортивні події",
    },
  ];

  return (
    <section className="advantages container">
      {advantages.map((el, i) => (
        <div key={i} className="advantage-card">
          <h2 className="fs-lg uppercase font-bold">{el.title}</h2>
          <p className="fs-sm">{el.description}</p>
        </div>
      ))}
    </section>
  );
}
