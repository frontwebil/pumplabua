"use client";

import { toggleAuthModal } from "@/redux/pamplabua/slices/uiSlice";
import { RootState } from "@/redux/pamplabua/store";
import { SITE_LINKS } from "@/site-config/site.config";
import Link from "next/link";
import { PiUserCircle } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";

export function CabinetLink() {
  const dispatch = useDispatch();
  const { userName, isLogged } = useSelector(
    (store: RootState) => store.uiSlice
  );

  const openAuthModal = () => {
    dispatch(toggleAuthModal());
  };

  return (
    <>
      {!isLogged ? (
        <div
          className="header-nav-user-func-col account"
          onClick={openAuthModal}
        >
          <PiUserCircle className="header-nav-user-func-icon" />
          <p className="fs-xs font-bold">Користувач</p>
        </div>
      ) : (
        <Link
          href={SITE_LINKS.ACCOUNT}
          className="header-nav-user-func-col account"
        >
          <PiUserCircle className="header-nav-user-func-icon" />
          <p className="fs-xs font-bold">{userName}</p>
        </Link>
      )}
    </>
  );
}
