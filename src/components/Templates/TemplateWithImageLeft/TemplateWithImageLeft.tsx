import "@/components/Templates/TemplateWithImageLeft/TemplateWithImageLeft.css";
import { SITE_LINKS } from "@/site-config/site.config";
import Image from "next/image";
import Link from "next/link";

type Props = {
  img: string;
  alt: string;
  title: React.ReactNode;
  subTitle: string;
  text: string;
};

export function TemplateWithImageLeft({
  img,
  title,
  alt,
  subTitle,
  text,
}: Props) {
  return (
    <section className="TemplateWithImageLeft">
      <div className="container">
        <div className="TemplateWithImageLeft-image">
          <Image src={img} alt={alt} width={1000} height={1000} />
        </div>
        <div className="TemplateWithImageLeft-text">
          <h2 className="fs-xxl font-bold uppercase">{title}</h2>
          <h4 className="fs-xl font-semibold">{subTitle}</h4>
          <p className="fs-lg">{text}</p>
          <Link
            href={SITE_LINKS.CATALOG}
            className="to-Catalog-blue fs-md uppercase font-bold to-catalog-blue-template-container"
          >
            у каталог
          </Link>
        </div>
      </div>
    </section>
  );
}
