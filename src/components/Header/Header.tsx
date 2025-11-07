"use client";

import { CiHeart, CiSearch } from "react-icons/ci";
import "@/components/Header/Header.css";
import Image from "next/image";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import { PiFlask, PiUserCircle } from "react-icons/pi";
import Link from "next/link";
import { useState } from "react";
import { SITE_LINKS, SOCIAL_LINKS } from "@/site-config/site.config";
import { useWindowWidth } from "@/custom-hooks/useWidth";

export function Header() {
  const [isOpenCatalog, setIsOpenCatalog] = useState(false);
  const [isOpenBurger, setIsOpenBurger] = useState(false);
  const screenWidth = useWindowWidth();
  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header-top">
            <div className="header-top-icons">
              <Link href={SOCIAL_LINKS.VIBER} target="_blank">
                <Image
                  src={"/header-icons/viber.svg"}
                  alt="viber"
                  width={30}
                  height={30}
                  className="header-top-icon"
                />
              </Link>
              <Link href={SOCIAL_LINKS.WHATSAPP} target="_blank">
                <Image
                  src={"/header-icons/whatsapp.svg"}
                  alt="whatsapp"
                  width={30}
                  height={30}
                  className="header-top-icon"
                />
              </Link>
              <Link href={SOCIAL_LINKS.TELEGRAM} target="_blank">
                <Image
                  src={"/header-icons/telegram.svg"}
                  alt="telegram"
                  width={30}
                  height={30}
                  className="header-top-icon"
                />
              </Link>
              <Link href={SOCIAL_LINKS.INSTAGRAM} target="_blank">
                <Image
                  src={"/header-icons/instagram.svg"}
                  alt="instagram"
                  width={30}
                  height={30}
                  className="header-top-icon"
                />
              </Link>
            </div>
            <form
              className="header-search-input-wrapper"
              role="search"
              aria-label="Пошук по сайту"
            >
              <input
                id="header-search"
                type="search"
                placeholder="Пошук"
                className="header-search-input fs-xs"
              />
              <label className="search-icon" htmlFor="header-search">
                <CiSearch color="#4F5052" />
              </label>
            </form>
          </div>

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
                <Link href={SITE_LINKS.ABOUT_PAGE} className="header-link">
                  <p className="fs-sm font-bold uppercase">Про нас</p>
                </Link>
                <Link href={SITE_LINKS.ORDERS_INFO} className="header-link">
                  <p className="fs-sm font-bold uppercase">замовлення</p>
                </Link>
                <Link href={SITE_LINKS.CONTACTS} className="header-link">
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
                <div
                  className={`burger-menu-catalog ${isOpenCatalog && "active"}`}
                >
                  <h2 className="fs-md font-semibold">Усі Категорії</h2>
                  <div className="fs-md capitalize ">протеїн</div>
                  <div className="fs-md capitalize ">креатин</div>
                  <div className="fs-md capitalize ">гейнер</div>
                  <div className="fs-md capitalize ">Амінокислоти</div>
                  <div className="fs-md capitalize ">вітаміни та бади</div>
                </div>
              </div>
              <div className="burger-menu-link">
                <p className="fs-md font-bold uppercase">Про нас</p>
              </div>
              <div className="burger-menu-link">
                <p className="fs-md font-bold uppercase">замовлення</p>
              </div>
              <div className="burger-menu-link">
                <p className="fs-md font-bold uppercase">контакти</p>
              </div>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}
