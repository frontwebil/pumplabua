"use client";

import { SITE_LINKS } from "@/site-config/site.config";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RxExit } from "react-icons/rx";

export function AccountNav() {
  const pathname = usePathname();

  const handleExit = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <div className="account-nav">
      <Link
        href={SITE_LINKS.ACCOUNT}
        className={`fs-md font-semibold account-nav-link ${
          pathname == "/account" && "active"
        }`}
      >
        Деталі профілю
      </Link>
      <Link
        href={SITE_LINKS.ACCOUNT_ORDERS}
        className={`fs-md font-semibold account-nav-link ${
          pathname == "/account/orders" && "active"
        }`}
      >
        Історія замовлень
      </Link>
      <div className="flex items-center gap-2 exit-button" onClick={handleExit}>
        <RxExit />
        <p className="fs-md font-semibold">Вийти</p>
      </div>
    </div>
  );
}
