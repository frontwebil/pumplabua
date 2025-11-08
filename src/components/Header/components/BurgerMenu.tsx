import { SITE_LINKS } from "@/site-config/site.config";
import Link from "next/link";
import { CiHeart, CiSearch } from "react-icons/ci";
import { MdKeyboardArrowDown } from "react-icons/md";
import { PiFlask, PiUserCircle } from "react-icons/pi";

type Props = {
  isOpenBurger: boolean;
  isOpenCatalog: boolean;
  setIsOpenCatalog: (value: boolean) => void;
  setIsOpenBurger: (value: boolean) => void;
};

export default function BurgerMenu({
  isOpenBurger,
  setIsOpenCatalog,
  isOpenCatalog,
  setIsOpenBurger,
}: Props) {
  return (
    <div className={`burger-menu ${isOpenBurger && "active"}`}>
      <div className="container">
        <div className="burger-menu-func">
          <div className="burger-menu-func-row">
            <CiSearch className="burger-menu-func-icon" />
            <p className="fs-md uppercase font-bold">пошук</p>
          </div>
          <div className="burger-menu-func-row">
            <PiUserCircle className="burger-menu-func-icon" />
            <p className="fs-md uppercase font-bold">Персональний акаунт</p>
          </div>
          <div className="burger-menu-func-row">
            <CiHeart className="burger-menu-func-icon" />
            <p className="fs-md uppercase font-bold">Збережено</p>
          </div>
          <div className="burger-menu-func-row">
            <PiFlask className="burger-menu-func-icon" />
            <p className="fs-md uppercase font-bold">Кошик</p>
          </div>
        </div>
        <nav className="burger-menu-nav">
          <div
            className="burger-menu-link"
            onClick={() => setIsOpenCatalog(!isOpenCatalog)}
          >
            <div className="burger-menu-link-with-tap">
              <p className="fs-md font-bold uppercase">каталог</p>
              <MdKeyboardArrowDown
                className={`burger-menu-link-icon ${
                  isOpenCatalog ? "rotate" : ""
                }`}
              />
            </div>
            <div className={`burger-menu-catalog ${isOpenCatalog && "active"}`}>
              <h2 className="fs-md font-semibold">Усі Категорії</h2>
              <div className="fs-md capitalize ">протеїн</div>
              <div className="fs-md capitalize ">креатин</div>
              <div className="fs-md capitalize ">гейнер</div>
              <div className="fs-md capitalize ">Амінокислоти</div>
              <div className="fs-md capitalize ">вітаміни та бади</div>
            </div>
          </div>
          <Link
            href={SITE_LINKS.ABOUT_PAGE}
            className="burger-menu-link"
            onClick={() => setIsOpenBurger(false)}
          >
            <p className="fs-md font-bold uppercase">Про нас</p>
          </Link>
          <Link
            href={SITE_LINKS.ORDERS_INFO}
            className="burger-menu-link"
            onClick={() => setIsOpenBurger(false)}
          >
            <p className="fs-md font-bold uppercase">замовлення</p>
          </Link>
          <Link
            href={SITE_LINKS.CONTACTS}
            className="burger-menu-link"
            onClick={() => setIsOpenBurger(false)}
          >
            <p className="fs-md font-bold uppercase">контакти</p>
          </Link>
        </nav>
      </div>
    </div>
  );
}
