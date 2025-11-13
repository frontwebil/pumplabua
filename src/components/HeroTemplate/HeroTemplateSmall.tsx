import "@/components/HeroTemplate/HeroTemplate.css";

type Props = {
  title: string;
  bgImage: string;
};

export function HeroTemplateSmall({ title, bgImage }: Props) {
  return (
    <section
      className="hero-template-small"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="container">
        <div className="hero-template-text">
          <h2 className="fs-xxl uppercase font-bold">{title}</h2>
        </div>
      </div>
    </section>
  );
}
