import Image from "next/image";
import "@/components/Footer/Footer.css";
import Link from "next/link";
import { SITE_LINKS, SOCIAL_LINKS } from "@/site-config/site.config";

export function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-top-content">
          <div className="footer-logo">
            <Image
              src={"/footer-logo.svg"}
              alt="footer-logo"
              width={300}
              height={300}
            />
          </div>
          <nav className="footer-nav">
            <Link
              href={SITE_LINKS.CATALOG}
              className="fs-sm font-bold uppercase footer-nav-link"
            >
              каталог
            </Link>
            <Link
              href={SITE_LINKS.ABOUT_PAGE}
              className="fs-sm font-bold uppercase footer-nav-link"
            >
              Про нас
            </Link>
            <Link
              href={SITE_LINKS.ORDERS_INFO}
              className="fs-sm font-bold uppercase footer-nav-link"
            >
              замовлення
            </Link>
            <Link
              href={SITE_LINKS.CONTACTS}
              className="fs-sm font-bold uppercase footer-nav-link"
            >
              контакти
            </Link>
          </nav>
          <div className="footer-icons-top">
            <Link
              href={SOCIAL_LINKS.VIBER}
              target="_blank"
              className="footer-icon"
            >
              <Image
                src={"/icons/viber.svg"}
                alt="Viber"
                width={100}
                height={100}
              />
            </Link>
            <Link
              href={SOCIAL_LINKS.WHATSAPP}
              target="_blank"
              className="footer-icon"
            >
              <Image
                src={"/icons/whatsup.svg"}
                alt="Whatsup"
                width={100}
                height={100}
              />
            </Link>
            <Link
              href={SOCIAL_LINKS.TELEGRAM}
              target="_blank"
              className="footer-icon"
            >
              <Image
                src={"/icons/telegram.svg"}
                alt="Telegram"
                width={100}
                height={100}
              />
            </Link>
            <Link
              href={SOCIAL_LINKS.INSTAGRAM}
              target="_blank"
              className="footer-icon"
            >
              <Image
                src={"/icons/instagram.svg"}
                alt="Instagram"
                 width={100}
                height={100}
              />
            </Link>
          </div>
        </div>
        <div className="footer-center-content">
          <div className="footer-center-content-column">
            <h3 className="fs-sm uppercase font-bold">користувачам</h3>
            <div className="footer-column-line"></div>
            <Link href={SITE_LINKS.ORDERS_INFO} className="fs-sm">
              Оплата і доставка
            </Link>
            <Link href={SITE_LINKS.ORDERS_INFO} className="fs-sm">
              Повернення та обмін
            </Link>
          </div>
          <div className="footer-center-content-column">
            <h3 className="fs-sm uppercase font-bold">контакти</h3>
            <div className="footer-column-line"></div>
            <Link href={SOCIAL_LINKS.NUMBER1} className="fs-sm">
              +38 (096) 966 - 39 - 69
            </Link>
            <Link href={SOCIAL_LINKS.NUMBER2} className="fs-sm">
              +38 (066) 966 - 39 - 69
            </Link>
          </div>
          <div className="footer-center-content-column">
            <h3 className="fs-sm uppercase font-bold">адреса</h3>
            <div className="footer-column-line"></div>
            <Link href={SOCIAL_LINKS.MAPS_LINK} className="fs-sm">
              Вул. Літературна 27
            </Link>
            <Link href={SOCIAL_LINKS.MAPS_LINK} className="fs-sm">
              ТРЦ City Mall
            </Link>
          </div>
          <div className="footer-center-content-column">
            <h3 className="fs-sm uppercase font-bold">робочі години</h3>
            <div className="footer-column-line"></div>
            <p className="fs-sm">9:00 по 21:00</p>
            <p className="fs-sm">без вихідних</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="fs-sm">© 2025. Всі права захищені</p>
          <p className="fs-sm">Публічний договір</p>
        </div>
      </div>
    </footer>
  );
}
