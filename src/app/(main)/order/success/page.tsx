import Link from "next/link";
import { MdCheckCircle } from "react-icons/md";
import { SITE_LINKS } from "@/site-config/site.config";
import { ResetOrders } from "./resetOrders";

export default function Page({
  searchParams,
}: {
  searchParams: { ref?: string };
}) {
  const orderRef = searchParams.ref;

  return (
    <div className="success-page">
      <ResetOrders />
      <div className="success-card">
        <MdCheckCircle className="success-icon" />

        <h1>Замовлення прийнято</h1>

        {orderRef && (
          <p className="success-ref">
            Номер замовлення: <b>{orderRef}</b>
          </p>
        )}

        <p className="success-text">
          Дякуємо за замовлення! Ми обробляємо його та зв’яжемося з вами
          найближчим часом.
        </p>

        <div className="success-buttons">
          <Link href={`${SITE_LINKS.ACCOUNT}/orders`} className="success-btn main">
            Мої замовлення
          </Link>

          <Link href={SITE_LINKS.CATALOG} className="success-btn">
            До каталогу
          </Link>
        </div>
      </div>
    </div>
  );
}
