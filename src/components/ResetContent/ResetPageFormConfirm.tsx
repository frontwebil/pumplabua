/* eslint-disable react-hooks/exhaustive-deps */

import { useParams, useRouter } from "next/navigation";
import "@/components/ResetContent/ResetContent.css";
import { useEffect } from "react";
import axios from "axios";

export function ResetPageFormConfirm() {
  const { token } = useParams();
  const router = useRouter();

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

  return (
    <div className="reset-page">
      <div className="reset-box">
        <h2 className="fs-xl uppercase font-bold">Оновлення пароля</h2>
        <p className="fs-md">
          Будь ласка, створіть новий пароль для свого облікового запису.
        </p>
        <form className="reset-form">
          <div className="reset-form-inputs">
            <input type="text" placeholder="Введіть новий пароль" required />
            <input
              type="password"
              placeholder="Підтвердіть новий пароль"
              required
            />
          </div>
          <button type="submit">Змінити пароль</button>
        </form>
      </div>
    </div>
  );
}
