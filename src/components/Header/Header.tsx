"use client";

import { CiHeart } from "react-icons/ci";
import "@/components/Header/Header.css";
import Image from "next/image";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import { PiFlask, PiUserCircle } from "react-icons/pi";
import Link from "next/link";
import { useState } from "react";
import { SITE_LINKS } from "@/site-config/site.config";
import { useWindowWidth } from "@/custom-hooks/useWidth";
import { usePathname } from "next/navigation";
import { HeaderTop } from "./components/Header-top";
import BurgerMenu from "./components/BurgerMenu";

export function Header() {
  const [isOpenCatalog, setIsOpenCatalog] = useState(false);
  const [isOpenBurger, setIsOpenBurger] = useState(false);
  const screenWidth = useWindowWidth();
  const pathname = usePathname();

  return (
    <>
      <header className="header">
        <div className="container">
          <HeaderTop />

          <div className="header-bottom">
            <div className="logo-container">
              {screenWidth! < 700 && (
                <div
                  className={`header-burger ${isOpenBurger && "active"}`}
                  onClick={() => setIsOpenBurger(!isOpenBurger)}
                >
                  <div className="header-burger-line"></div>
                  <div className="header-burger-line"></div>
                  <div className="header-burger-line"></div>
                </div>
              )}
              <Link href={"/"} className="logo">
                <Image
                  src="/logo.svg"
                  alt="Pumplab logo"
                  width={1000}
                  height={1000}
                  priority
                />
              </Link>
            </div>
            {screenWidth! > 700 && (
              <nav className="header-nav-links">
                <div
                  className="header-link"
                  onClick={() => setIsOpenCatalog(!isOpenCatalog)}
                >
                  <p className="fs-sm font-bold uppercase">каталог</p>
                  <MdKeyboardArrowDown
                    className={`header-link-arrow ${
                      isOpenCatalog ? "rotate" : ""
                    }`}
                  />
                </div>
                <Link href={SITE_LINKS.ABOUT_PAGE} className={`header-link ${pathname === '/about' && "active"}`}>
                  <p className="fs-sm font-bold uppercase">Про нас</p>
                </Link>
                <Link href={SITE_LINKS.ORDERS_INFO} className={`header-link ${pathname === '/orders-info' && "active"}`}>
                  <p className="fs-sm font-bold uppercase">замовлення</p>
                </Link>
                <Link href={SITE_LINKS.CONTACTS} className={`header-link ${pathname === '/contacts' && "active"}`}>
                  <p className="fs-sm font-bold uppercase">контакти</p>
                </Link>
                <div
                  className={`header-catalog-menu ${
                    isOpenCatalog ? "active" : ""
                  }`}
                >
                  <div className="header-catalog-menu-top">
                    <h2 className="fs-md uppercase font-bold">усі категорії</h2>
                    <MdKeyboardArrowRight className="header-catalog-menu-icon font-bold" />
                  </div>
                  <div className="header-catalog-menu-links">
                    <div className="fs-md font-bold uppercase">протеїн</div>
                    <div className="fs-md font-bold uppercase">креатин</div>
                    <div className="fs-md font-bold uppercase">гейнер</div>
                    <div className="fs-md font-bold uppercase">
                      Амінокислоти
                    </div>
                    <div className="fs-md font-bold uppercase">
                      вітаміни та бади
                    </div>
                  </div>
                </div>
              </nav>
            )}

            <div className="header-nav-user-func">
              <div className="header-nav-user-func-col">
                <CiHeart className="header-nav-user-func-icon" />
                <p className="fs-xs font-bold">Збережено</p>
              </div>
              <div className="header-nav-user-func-col">
                <PiFlask className="header-nav-user-func-icon" />
                <p className="fs-xs font-bold">Кошик</p>
              </div>
              <div className="header-nav-user-func-col">
                <PiUserCircle className="header-nav-user-func-icon" />
                <p className="fs-xs font-bold">Користувач</p>
              </div>
            </div>
          </div>
        </div>
        <BurgerMenu
          isOpenBurger={isOpenBurger}
          isOpenCatalog={isOpenCatalog}
          setIsOpenCatalog={setIsOpenCatalog}
          setIsOpenBurger={setIsOpenBurger}
        />
      </header>
    </>
  );
}
