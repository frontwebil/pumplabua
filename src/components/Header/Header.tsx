import { CiSearch } from "react-icons/ci";
import "@/components/Header/Header.css";
import Image from "next/image";
import { MdKeyboardArrowDown } from "react-icons/md";
import { PiFlask, PiUserCircle } from "react-icons/pi";
import { IoMdHeartEmpty } from "react-icons/io";
import Link from "next/link";

export function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="header-top">
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
          <Link href={"/"} className="logo">
            <Image
              src="/logo.svg"
              alt="Pumplab logo"
              width={1000}
              height={1000}
              priority
            />
          </Link>
          <nav className="header-nav-links">
            <div className="header-link">
              <p className="fs-sm font-bold uppercase">каталог</p>
              <MdKeyboardArrowDown className="header-link-arrow" />
            </div>
            <div className="header-link">
              <p className="fs-sm font-bold uppercase">Про нас</p>
            </div>
            <div className="header-link">
              <p className="fs-sm font-bold uppercase">замовлення</p>
            </div>
            <div className="header-link">
              <p className="fs-sm font-bold uppercase">контакти</p>
            </div>
          </nav>
          <div className="header-nav-user-func">
            <div className="header-nav-user-func-col">
              <IoMdHeartEmpty className="header-nav-user-func-icon" />
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
    </header>
  );
}
