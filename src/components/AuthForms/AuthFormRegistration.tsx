import { closeAuthModal } from "@/redux/pamplabua/slices/uiSlice";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { BsEye } from "react-icons/bs";
import { CgClose } from "react-icons/cg";
import { FiEyeOff } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export function AuthFormRegistration({
  setIsloginModal,
}: {
  setIsloginModal: (value: boolean) => void;
}) {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCloseModal = () => {
    dispatch(closeAuthModal());
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    try {
      await axios.post("/api/auth/register", {
        name,
        surname,
        email,
        password,
      });

      const loginRes = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      setEmail("");
      setPassword("");
      setName("");
      setSurname("");

      if (loginRes?.error) {
        router.replace("/");
      } else {
        toast("Ви зареєстрували акаунт!");
      }
      handleCloseModal();
      setLoading(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast(error.response?.data.error || "Щось пішло не так");
      } else {
        toast("Проблеми зі з'єднанням , спробуйте ще!");
      }
      setLoading(false);
    }
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
          onSubmit={handleSignUp}
        >
          <CgClose className="close-modal" onClick={handleCloseModal} />
          <h2 className="fs-xl uppercase font-bold text-center">Реєстрація</h2>
          <h3 className="fs-md text-center" style={{ color: "#4F5052" }}>
            Створіть новий акаунт
          </h3>

          <div className="auth-form-inputs">
            <div className="auth-form-reg-names">
              <div className="auth-form-input-group">
                <label htmlFor="surname" className="fs-md font-semibold">
                  Прізвище
                </label>
                <input
                  id="surname"
                  type="text"
                  placeholder="Ваше Прізвище"
                  value={surname}
                  onChange={(e) => {
                    setSurname(e.target.value);
                  }}
                />
              </div>
              <div className="auth-form-input-group">
                <label htmlFor="name" className="fs-md font-semibold">
                  Ім&apos;я
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Ваше Ім'я"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
            </div>
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
              <label htmlFor="password" className="fs-md font-semibold">
                Пароль
              </label>
              <div className="form-input-group-password">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Мінімум 8 символів"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
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
            {loading ? "Реєструємо..." : "Реєстрація"}
          </button>

          <div className="auth-form-under-form">
            <div className="fs-lg text-center" style={{ color: "#4F5052" }}>
              Вже маєте акаунт?{" "}
              <span
                className="font-semibold uppercase cursor-pointer"
                style={{ color: "#0339F4" }}
                onClick={() => {
                  setIsloginModal(true);
                }}
              >
                УВІЙТИ
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
