import "@/components/Energy/Energy.css";
import Image from "next/image";
import { MdKeyboardArrowDown } from "react-icons/md";

export function Energy() {
  return (
    <section className="energy">
      <div className="container">
        <div className="energy-text">
          <h2 className="fs-xxl uppercase font-bold">
            <span style={{ color: "#2858FF" }}>PUMP LAB</span> —{" "}
            <span style={{ color: "#FBF90D" }}>енергія</span> , що піднімає твої
            результати!
          </h2>
          <h3 className="fs-xl">
            Поринь у світ активних досягнень разом із Pump Lab!
          </h3>
          <p className="fs-lg">
            Поринь у світ спорту з асортиментом перевірених брендів, які
            обирають професіонали. <br /> Наші продукти допомагають тренуватись
            ефективніше і відновлюватись швидше.
          </p>

          <div className="energy-buttons">
            <div className="in-catalog-button fs-md">у каталог</div>
            <div className="know-more">
              <p className="fs-md">Дізнатись більше</p>
              <MdKeyboardArrowDown className="know-more-icon" />
            </div>
          </div>
        </div>
        <div className="energy-main-image">
          <Image
            src={"/Home/Energy/main-image.png"}
            alt="PUMP LAB — енергія,
що піднімає твої результати!"
            width={1000}
            height={1000}
          />
        </div>
      </div>
    </section>
  );
}
