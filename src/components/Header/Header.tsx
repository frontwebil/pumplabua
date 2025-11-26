"use client";

import "@/components/Header/Header.css";
import Image from "next/image";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import { PiFlask } from "react-icons/pi";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { CATEGORYES, SITE_LINKS } from "@/site-config/site.config";
import { useWindowWidth } from "@/custom-hooks/useWidth";
import { usePathname } from "next/navigation";
import { HeaderTop } from "./components/Header-top";
import BurgerMenu from "./components/BurgerMenu";
import { CabinetLink } from "./components/CabinetLink";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import {
  setFavoritesProducts,
  setSession,
  toggleBurger,
  toggleBurgerCatalog,
  toggleIsOpenOrderModal,
} from "@/redux/pamplabua/slices/uiSlice";
import { RootState } from "@/redux/pamplabua/store";
import axios from "axios";
import { useProducts } from "@/custom-hooks/fetchProducts";
import {
  setFiltersFromLink,
  setProducts,
} from "@/redux/pamplabua/slices/productsSlice";
import { FavoriteLink } from "./components/FavoriteLink";

export function Header() {
  const { isOpenBurger, isOpenBurgerCatalog } = useSelector(
    (store: RootState) => store.uiSlice
  );
  const screenWidth = useWindowWidth();
  const pathname = usePathname();
  const catalogMenuRef = useRef<HTMLDivElement | null>(null);
  const { data, status } = useSession();
  const dispatch = useDispatch();
  const { data: products } = useProducts();

  useEffect(() => {
    dispatch(setProducts(products));
  }, [dispatch, products]);

  const getFavorites = async () => {
    try {
      const { data } = await axios.get("/api/user/getFavorites");
      dispatch(setFavoritesProducts(data));
    } catch (error) {
      console.error("Failed to toggle favorite:", error);
    }
  };

  useEffect(() => {
    if (status === "authenticated" && data?.user.id) {
      dispatch(setSession(data.user));
      getFavorites();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, data, dispatch]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function handleClickOutside(e: any) {
      if (
        catalogMenuRef.current &&
        !catalogMenuRef.current.contains(e.target)
      ) {
        if (isOpenBurgerCatalog) {
          dispatch(toggleBurgerCatalog());
        }
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpenBurgerCatalog, dispatch]);

  return (
    <>
      <header className="header">
        <div className="container">
          <HeaderTop />

          <div className="header-bottom">
            <div className="logo-container">
              {screenWidth === 0
                ? ""
                : screenWidth! < 700 && (
                    <div
                      className={`header-burger ${isOpenBurger && "active"}`}
                      onClick={() => dispatch(toggleBurger())}
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
            {screenWidth === 0
              ? ""
              : screenWidth! > 700 && (
                  <nav className="header-nav-links">
                    <div
                      className="header-link"
                      onClick={() => dispatch(toggleBurgerCatalog())}
                    >
                      <p className="fs-sm font-bold uppercase">каталог</p>
                      <MdKeyboardArrowDown
                        className={`header-link-arrow ${
                          isOpenBurgerCatalog ? "rotate" : ""
                        }`}
                      />
                    </div>
                    <Link
                      href={SITE_LINKS.ABOUT_PAGE}
                      className={`header-link ${
                        pathname === "/about" && "active"
                      }`}
                    >
                      <p className="fs-sm font-bold uppercase">Про нас</p>
                    </Link>
                    <Link
                      href={SITE_LINKS.ORDERS_INFO}
                      className={`header-link ${
                        pathname === "/orders-info" && "active"
                      }`}
                    >
                      <p className="fs-sm font-bold uppercase">замовлення</p>
                    </Link>
                    <Link
                      href={SITE_LINKS.CONTACTS}
                      className={`header-link ${
                        pathname === "/contacts" && "active"
                      }`}
                    >
                      <p className="fs-sm font-bold uppercase">контакти</p>
                    </Link>
                    <div
                      ref={catalogMenuRef}
                      className={`header-catalog-menu ${
                        isOpenBurgerCatalog ? "active" : ""
                      }`}
                    >
                      <div className="header-catalog-menu-top">
                        <Link
                          href={SITE_LINKS.CATALOG}
                          className="fs-md uppercase font-bold"
                          onClick={() => dispatch(toggleBurgerCatalog())}
                        >
                          усі категорії
                        </Link>
                        <MdKeyboardArrowRight className="header-catalog-menu-icon font-bold" />
                      </div>
                      <div className="header-catalog-menu-links">
                        {CATEGORYES.map((category) => (
                          <Link
                            href={SITE_LINKS.CATALOG}
                            onClick={() => {
                              dispatch(setFiltersFromLink([category.value]));
                              dispatch(toggleBurgerCatalog());
                            }}
                            className="fs-md font-bold uppercase header-catalog-menu-link"
                            key={category.key}
                          >
                            {category.value}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </nav>
                )}

            <div className="header-nav-user-func">
              <FavoriteLink />
              <div
                className="header-nav-user-func-col"
                onClick={() => dispatch(toggleIsOpenOrderModal())}
              >
                <Image
                  src={"/favicon.png"}
                  alt=""
                  width={1000}
                  height={1000}
                  className="header-nav-user-func-icon"
                />
                <p className="fs-xs font-bold">Кошик</p>
              </div>
              <CabinetLink />
            </div>
          </div>
        </div>
        <BurgerMenu />
      </header>
    </>
  );
}
