"use client";

import { closeAuthModal } from "@/redux/pamplabua/slices/uiSlice";
import { SITE_LINKS } from "@/site-config/site.config";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRef, useState } from "react";
import { BsEye } from "react-icons/bs";
import { CgClose } from "react-icons/cg";
import { FiEyeOff } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export function AuthFormLogin({
  setIsloginModal,
}: {
  setIsloginModal: (value: boolean) => void;
}) {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const handleCloseModal = () => {
    dispatch(closeAuthModal());
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    if (!email || !password) {
      toast("Всі поля важливі!");
      setLoading(false);
      return;
    }

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      toast("Неправильний email або пароль");
    } else {
      toast.success("Вхід успішний");
    }
    setLoading(false);
    handleCloseModal();
  };

  return (
    <div
      className="auth-forms-container"
      onClick={(e) => {
        if (formRef.current && !formRef.current.contains(e.target as Node)) {
          handleCloseModal();
        }
      }}
    >
      <div className="auth-form">
        <form
          className="auth-form-wrapper"
          ref={formRef}
          onSubmit={handleLogin}
        >
          <CgClose className="close-modal" onClick={handleCloseModal} />
          <h2 className="fs-xl uppercase font-bold text-center">вхід</h2>
          <h3 className="fs-md text-center" style={{ color: "#4F5052" }}>
            Увійдіть в існуючий акаунт
          </h3>

          <div className="auth-form-inputs">
            <div className="auth-form-input-group">
              <label htmlFor="email" className="fs-md font-semibold">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="auth-form-input-group-password">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="fs-md font-semibold">
                  Пароль
                </label>
                <Link
                  href={SITE_LINKS.RESET_PASSWORD}
                  className="fs-sm hover:text-blue-500 cursor-pointer transition"
                >
                  Забули пароль?
                </Link>
              </div>
              <div className="form-input-group-password">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder={`${showPassword ? "12345678" : "********"}`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                >
                  {showPassword ? (
                    <FiEyeOff className="form-input-group-password-icon" />
                  ) : (
                    <BsEye className="form-input-group-password-icon" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <button className="auth-form-submit-button" disabled={loading}>
            {loading ? "Входимо..." : "Увійти"}
          </button>

          <div className="auth-form-under-form">
            <div className="fs-lg text-center" style={{ color: "#4F5052" }}>
              Не маєте акаунту?{" "}
              <span
                className="font-semibold uppercase cursor-pointer"
                style={{ color: "#0339F4" }}
                onClick={() => {
                  setIsloginModal(false);
                }}
              >
                РЕЄСТРАЦІЯ
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
