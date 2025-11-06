import "@/components/PartnerInGoal/PartnerInGoal.css";
import { SITE_LINKS } from "@/site-config/site.config";
import Link from "next/link";
import { MdKeyboardArrowDown } from "react-icons/md";

export function PartnerInGoal() {
  return (
    <section className="PartnerInGoal">
      <div className="container">
        <div className="PartnerInGoal-text">
          <h2 className="fs-xxl uppercase font-bold">
            <span style={{ color: "#2858FF" }}>Pump Lab</span> — твій партнер{" "}
            <span style={{ color: "#FBF90D" }}>у досягненнях</span>
          </h2>
          <h3 className="fs-xl font-bold">
            Ми створюємо не просто продукти — ми створюємо можливості для
            розвитку, сили та перемог.
          </h3>
          <p className="fs-lg">
            Приєднуйся до Pump Lab і розвивайся разом із нами!
          </p>
          <div className="PartnerInGoal-buttons">
            <Link href={SITE_LINKS.CATALOG} className="in-catalog-button fs-md">
              у каталог
            </Link>
            <Link href={SITE_LINKS.ABOUT_PAGE} className="know-more">
              <p className="fs-md">Дізнатись більше</p>
              <MdKeyboardArrowDown className="know-more-icon" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
