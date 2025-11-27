import Link from "next/link";
import { MdErrorOutline } from "react-icons/md";
import { SITE_LINKS } from "@/site-config/site.config";
import { ResetOrders } from "../success/resetOrders";

export default function CancelledPage({
  searchParams,
}: {
  searchParams: { ref?: string };
}) {
  return (
    <div className="success-page failed">
      <ResetOrders />

      <div className="success-card failed">
        <MdErrorOutline className="success-icon failed" />

        <h1>Щось пішло не так</h1>

        <p className="success-text">
          На жаль, виникла помилка під час оплати або платіж було скасовано.
        </p>

        <p className="success-subtext">
          Ви можете повторити спробу або оформити замовлення ще раз.
        </p>

        <div className="success-buttons">
          <Link href={"/order"} className="success-btn main danger">
            Спробувати ще раз
          </Link>

          <Link href={SITE_LINKS.CATALOG} className="success-btn">
            До каталогу
          </Link>
        </div>
      </div>
    </div>
  );
}
