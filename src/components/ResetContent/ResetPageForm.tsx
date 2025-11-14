"use client";

import "@/components/ResetContent/ResetContent.css";
import { toggleAuthModal } from "@/redux/pamplabua/slices/uiSlice";
import { RootState } from "@/redux/pamplabua/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export function ResetPageForm() {
  const dispatch = useDispatch();
  const { isLogged } = useSelector((store: RootState) => store.uiSlice);
  const [email, setEmail] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (isLogged) {
      router.replace("/");
    }
  }, [isLogged, router]);

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!isValidEmail) {
      toast.error("Введіть коректну електронну пошту");
      return;
    }

    try {
      const res = await fetch("/api/auth/reset/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      await res.json();

      toast.success("Якщо email існує — ми надіслали лист для скидання пароля");
      setEmail("");
    } catch (error) {
      console.log(error);
      toast.error(
        "Сталася помилка. Спробуйте ще раз та перевірте правильність данних."
      );
    }
  };
  return (
    <div className="reset-page">
      <div className="reset-box">
        <h2 className="fs-xl uppercase font-bold">Скинути мій пароль</h2>
        <p className="fs-md">
          Посилання для скидання пароля буде надіслано на вашу пошту
        </p>
        <form className="reset-form" onSubmit={handleResetPassword}>
          <input
            type="email"
            id="email"
            placeholder="Ваша пошта"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Скинути пароль</button>
        </form>
        <div className="auth-form-under-form">
          <div className="fs-lg text-center" style={{ color: "#4F5052" }}>
            Згадали пароль?{" "}
            <span
              className="font-semibold uppercase cursor-pointer"
              style={{ color: "#0339F4" }}
              onClick={() => dispatch(toggleAuthModal())}
            >
              Увійти
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
