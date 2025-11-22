import { SOCIAL_LINKS } from "@/site-config/site.config";
import Image from "next/image";
import Link from "next/link";
import { Search } from "./Search";

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
      <Search />
    </div>
  );
}
