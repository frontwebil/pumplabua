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
  toggleAuthModal,
  toggleBurgerCatalog,
} from "@/redux/pamplabua/slices/uiSlice";
import { useEffect, useState } from "react";
import {
  searchProduct,
  setFiltersFromLink,
} from "@/redux/pamplabua/slices/productsSlice";
import { toast } from "react-toastify";
import { useWindowWidth } from "@/custom-hooks/useWidth";
import Image from "next/image";

export default function BurgerMenu() {
  const screenWidth = useWindowWidth();

  const [searchTerm, setSearchTerm] = useState("");
  const { isOpenBurger, isOpenBurgerCatalog, isLogged } = useSelector(
    (store: RootState) => store.uiSlice
  );
  const { searchProducts } = useSelector(
    (store: RootState) => store.productsSlice
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(searchProduct(searchTerm));
  }, [dispatch, searchTerm]);

  return (
    <div className={`burger-menu ${isOpenBurger && "active"}`}>
      <div className="container">
        <div className="burger-menu-func">
          {screenWidth && screenWidth < 600 && (
            <div className="burger-menu-func-row">
              <CiSearch className="burger-menu-func-icon" />
              <input
                type="text"
                className="fs-md font-bold outline-none"
                placeholder="Пошук"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          )}

          <CabinetLinkMobile />
          {!isLogged ? (
            <div
              className="burger-menu-func-row"
              onClick={() => {
                dispatch(toggleAuthModal());
                toast("Увійдіть, щоб переглянути улюблені");
                dispatch(closeBurger());
              }}
            >
              <CiHeart className="burger-menu-func-icon" />
              <p className="fs-md uppercase font-bold">Збережено</p>
            </div>
          ) : (
            <Link
              href={SITE_LINKS.FAVORITES}
              className="burger-menu-func-row"
              onClick={() => dispatch(closeBurger())}
            >
              <CiHeart className="burger-menu-func-icon" />
              <p className="fs-md uppercase font-bold">Збережено</p>
            </Link>
          )}

          <div
            className="burger-menu-func-row"
            onClick={() => dispatch(closeBurger())}
          >
            <Image
              src={"/favicon.png"}
              alt=""
              width={1000}
              height={1000}
              className="burger-menu-func-icon"
            />
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
              <Link
                href={SITE_LINKS.CATALOG}
                onClick={() => dispatch(closeBurger())}
                className="fs-md font-semibold"
              >
                Усі Категорії
              </Link>
              {CATEGORYES.map((el) => (
                <Link
                  className="fs-md capitalize"
                  key={el.key}
                  href={SITE_LINKS.CATALOG}
                  onClick={() => {
                    dispatch(setFiltersFromLink([el.value])); // <—— ОЦЕ ПРАВИЛЬНО
                    dispatch(toggleBurgerCatalog());
                    dispatch(closeBurger());
                  }}
                >
                  {el.value}
                </Link>
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
