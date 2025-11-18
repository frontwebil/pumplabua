import "@/components/Contacts/Contacts.css";
import { SOCIAL_LINKS } from "@/site-config/site.config";
import Link from "next/link";
import { FaInstagram, FaTelegram, FaViber, FaWhatsapp } from "react-icons/fa";
import { ContactForm } from "../ContactForm/ContactForm";

export function Contacts() {
  return (
    <section className="contacts">
      <div className="container">
        <div className="left-contacts-info">
          <h2 className="fs-xxl font-bold uppercase">
            <span style={{ color: "#2858FF" }}>PUMP LAB</span> — енергія, що
            піднімає твої результати!
          </h2>
          <h3 className="fs-lg">
            Наше спортивне харчування не просто підтримує твої тренування — воно
            заряджає енергією
          </h3>
          <div className="contacts-text">
            <div className="contacts-text-column">
              <h4
                className="fs-sm uppercase font-bold"
                style={{ color: "#0339F4" }}
              >
                Мобільний телефон
              </h4>
              {/* <div className="contacts-text-column-line"></div> */}

              <Link
                href={SOCIAL_LINKS.NUMBER1}
                className="contacts-text-column-link"
              >
                +38 (096) 966 - 39 - 69
              </Link>
              <Link
                href={SOCIAL_LINKS.NUMBER2}
                className="contacts-text-column-link"
              >
                +38 (066) 966 - 39 - 69
              </Link>
              <div className="contacts-text-column-link ">‎</div>

              <div className="contacts-text-column-social-links">
                <Link href={SOCIAL_LINKS.VIBER}>
                  <FaViber className="contacts-text-column-icon" />
                </Link>
                <Link href={SOCIAL_LINKS.WHATSAPP}>
                  <FaWhatsapp className="contacts-text-column-icon" />
                </Link>
                <Link href={SOCIAL_LINKS.TELEGRAM}>
                  <FaTelegram className="contacts-text-column-icon" />
                </Link>
                <Link href={SOCIAL_LINKS.INSTAGRAM}>
                  <FaInstagram className="contacts-text-column-icon" />
                </Link>
              </div>
            </div>
            <div className="contacts-text-column-right">
              <h4
                className="fs-sm uppercase font-bold"
                style={{ color: "#0339F4" }}
              >
                адреса
              </h4>
              <div className="contacts-text-column-text-row">
                <p className="fs-sm">м. Ірпінь</p>
              </div>
              <div className="contacts-text-column-text-row">
                <Link href={SOCIAL_LINKS.MAPS_LINK} className="fs-sm">
                  Вул. Літературна 27
                </Link>
                <p className="fs-sm">9:00 по 21:00</p>
              </div>
              <div className="contacts-text-column-text-row">
                <Link href={SOCIAL_LINKS.MAPS_LINK} className="fs-sm">
                  ТРЦ CITY MALL
                </Link>
                <p className="fs-sm font-semibold">без вихідних</p>
              </div>
              <div className="contacts-text-column-text-row bottom">
                <p className="fs-sm">
                  Вхід зі сторони{" "}
                  <span className="font-semibold">ЦЕНТРАЛЬНОГО ПАРКУ</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
