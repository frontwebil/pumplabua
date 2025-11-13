"use client";

import "@/components/AuthForms/AuthForms.css";
import { useEffect, useState } from "react";
import { AuthFormRegistration } from "./AuthFormRegistration";
import { AuthFormLogin } from "./AuthFormLogin";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/pamplabua/store";

export function AuthForms() {
  const { isOpenAuthModal, isLogged } = useSelector(
    (store: RootState) => store.uiSlice
  );
  const [isLoginModal, setIsloginModal] = useState(true);

  useEffect(() => {
    if (isOpenAuthModal) {
      document.body.classList.add("body-no-scroll");
    } else {
      document.body.classList.remove("body-no-scroll");
    }

    if (isLogged) {
      document.body.classList.remove("body-no-scroll");
    }

    // на випадок, якщо компонент розмонтується
    return () => {
      document.body.classList.remove("body-no-scroll");
    };
  }, [isOpenAuthModal, isLogged]);

  if (!isOpenAuthModal || isLogged) return;
  return (
    <>
      {isLoginModal ? (
        <AuthFormLogin setIsloginModal={setIsloginModal} />
      ) : (
        <AuthFormRegistration setIsloginModal={setIsloginModal} />
      )}
    </>
  );
}
