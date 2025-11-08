import "@/components/FooterBanner/FooterBanner.css";
import { SITE_LINKS } from "@/site-config/site.config";
import Link from "next/link";

type Props = {
  bgImage: string;
  title: string;
  subTitle: string;
  text: string;
};

export function FooterBanner({ title, subTitle, text, bgImage }: Props) {
  return (
    <div className="container">
      <section
        className="footer-banner"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="footer-banner-text">
          <h2 className="fs-xxl uppercase font-bold">{title}</h2>
          <h3 className="fs-xl font-semibold">{subTitle}</h3>
          <p className="fs-lg">{text}</p>
          <Link
            href={SITE_LINKS.CATALOG}
            className="to-Catalog-blue fs-md uppercase font-bold footer-to-catalog-container"
          >
            Обрати свій продукт
          </Link>
        </div>
      </section>
    </div>
  );
}
