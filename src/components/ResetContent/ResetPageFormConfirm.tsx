import { useParams, useRouter } from "next/navigation";
import "@/components/ResetContent/ResetContent.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { toggleAuthModal } from "@/redux/pamplabua/slices/uiSlice";
import { useDispatch } from "react-redux";

export function ResetPageFormConfirm() {
  const { token } = useParams();
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const CheckIsValidToken = async () => {
    const { data } = await axios.get(
      `/api/auth/reset/is-valid-token?token=${token}`
    );
    return data.isValidToken;
  };

  useEffect(() => {
    const isValidToken = CheckIsValidToken();
    if (!isValidToken) {
      router.replace("/");
    }
  }, [router, token]);

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) return;

    try {
      if (password !== confirmPassword) {
        toast("Паролі мають співпадати");
        return;
      }

      setLoading(true);

      await axios.post("/api/auth/reset/reset-confirm-password", {
        token,
        password,
      });

      toast("Пароль зміненно!");
      dispatch(toggleAuthModal());
      router.replace("/");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response?.data?.error) {
        toast(error.response.data.error);
      } else {
        toast.error("Сталася невідома помилка");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-page">
      <div className="reset-box">
        <h2 className="fs-xl uppercase font-bold">Оновлення пароля</h2>
        <p className="fs-md">
          Будь ласка, створіть новий пароль для свого облікового запису.
        </p>
        <form className="reset-form" onSubmit={handleResetPassword}>
          <div className="reset-form-inputs">
            <input
              type="text"
              name="new password"
              placeholder="Введіть новий пароль"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <input
              type="password"
              name="confirm new password"
              placeholder="Підтвердіть новий пароль"
              required
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Змінюємо пароль..." : "Змінити пароль"}
          </button>
        </form>
      </div>
    </div>
  );
}
