import { CATEGORYES, SITE_LINKS } from "@/site-config/site.config";
import Link from "next/link";
import { CiHeart, CiSearch } from "react-icons/ci";
import { MdKeyboardArrowDown } from "react-icons/md";
import { PiFlask } from "react-icons/pi";
import { CabinetLinkMobile } from "./CabinetLinkMobile";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/pamplabua/store";
import {
  closeBurger,
  toggleBurgerCatalog,
} from "@/redux/pamplabua/slices/uiSlice";

export default function BurgerMenu() {
  const { isOpenBurger, isOpenBurgerCatalog } = useSelector(
    (store: RootState) => store.uiSlice
  );
  const dispatch = useDispatch();

  return (
    <div className={`burger-menu ${isOpenBurger && "active"}`}>
      <div className="container">
        <div className="burger-menu-func">
          <div className="burger-menu-func-row">
            <CiSearch className="burger-menu-func-icon" />
            <p className="fs-md uppercase font-bold">пошук</p>
          </div>
          <CabinetLinkMobile />
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
            onClick={() => dispatch(toggleBurgerCatalog())}
          >
            <div className="burger-menu-link-with-tap">
              <p className="fs-md font-bold uppercase">каталог</p>
              <MdKeyboardArrowDown
                className={`burger-menu-link-icon ${
                  isOpenBurgerCatalog ? "rotate" : ""
                }`}
              />
            </div>
            <div
              className={`burger-menu-catalog ${
                isOpenBurgerCatalog && "active"
              }`}
            >
              <Link href={SITE_LINKS.CATALOG} className="fs-md font-semibold">
                Усі Категорії
              </Link>
              {CATEGORYES.map((el) => (
                <div className="fs-md capitalize" key={el.key}>
                  {el.value}
                </div>
              ))}
            </div>
          </div>
          <Link
            href={SITE_LINKS.ABOUT_PAGE}
            className="burger-menu-link"
            onClick={() => dispatch(closeBurger())}
          >
            <p className="fs-md font-bold uppercase">Про нас</p>
          </Link>
          <Link
            href={SITE_LINKS.ORDERS_INFO}
            className="burger-menu-link"
            onClick={() => dispatch(closeBurger())}
          >
            <p className="fs-md font-bold uppercase">замовлення</p>
          </Link>
          <Link
            href={SITE_LINKS.CONTACTS}
            className="burger-menu-link"
            onClick={() => dispatch(closeBurger())}
          >
            <p className="fs-md font-bold uppercase">контакти</p>
          </Link>
        </nav>
      </div>
    </div>
  );
}
