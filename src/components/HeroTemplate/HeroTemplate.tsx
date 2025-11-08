import "@/components/HeroTemplate/HeroTemplate.css";

type Props = {
  title: string;
  text: string;
  bgImage: string;
};

export function HeroTemplate({ title, text, bgImage }: Props) {
  return (
    <section
      className="hero-template"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="container">
        <div className="hero-template-text">
          <h2 className="fs-xxl uppercase font-bold">{title}</h2>
          <p className="fs-xl">{text}</p>
        </div>
      </div>
    </section>
  );
}
