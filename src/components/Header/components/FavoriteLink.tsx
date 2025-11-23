"use client";

import { toggleAuthModal } from "@/redux/pamplabua/slices/uiSlice";
import { RootState } from "@/redux/pamplabua/store";
import { SITE_LINKS } from "@/site-config/site.config";
import Link from "next/link";
import { CiHeart } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export function FavoriteLink() {
  const { isLogged } = useSelector((store: RootState) => store.uiSlice);
  const dispatch = useDispatch();

  const openAuthModal = () => {
    toast("Увійдіть, щоб переглянути улюблені");
    dispatch(toggleAuthModal());
  };

  return (
    <>
      {!isLogged ? (
        <div
          onClick={() => openAuthModal()}
          className="header-nav-user-func-col"
        >
          <CiHeart className="header-nav-user-func-icon" />
          <p className="fs-xs font-bold">Збережені</p>
        </div>
      ) : (
        <Link href={SITE_LINKS.FAVORITES} className="header-nav-user-func-col">
          <CiHeart className="header-nav-user-func-icon" />
          <p className="fs-xs font-bold">Збережені</p>
        </Link>
      )}
    </>
  );
}
