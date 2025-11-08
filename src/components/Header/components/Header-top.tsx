import { SOCIAL_LINKS } from "@/site-config/site.config";
import Image from "next/image";
import Link from "next/link";
import { CiSearch } from "react-icons/ci";

export function HeaderTop() {
  return (
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
  );
}
