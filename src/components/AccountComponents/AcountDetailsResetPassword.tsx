import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

export function AcountDetailsResetPassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    if (newPassword !== confPassword) {
      toast.error("Паролі мають співпадати");

      return;
    }

    try {
      const res = await axios.post("/api/auth/reset/reset-pass-from-acc", {
        oldPassword,
        newPassword,
      });

      if (res.status === 200) {
        toast.success("Пароль успішно змінено");
        setOldPassword("");
        setNewPassword("");
        setConfPassword("");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response?.data?.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Сталася невідома помилка");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="fs-xl font-bold uppercase">пароль</h2>
      <form
        className="account-details-info-form"
        onSubmit={handleResetPassword}
      >
        <div className="acount-details-row-input-wrapper">
          <label htmlFor="" className="fs-sm font-semibold">
            Старий пароль
          </label>
          <input
            type="text"
            placeholder="Вкажіть старий пароль"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </div>
        <div className="acount-details-row-input-wrapper">
          <label htmlFor="" className="fs-sm font-semibold">
            Новий пароль
          </label>
          <input
            type="text"
            placeholder="Створіть новий пароль"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="acount-details-row-input-wrapper">
          <label htmlFor="" className="fs-sm font-semibold">
            Повторіть новий пароль
          </label>
          <input
            type="password"
            placeholder="Повторіть новий пароль"
            value={confPassword}
            onChange={(e) => setConfPassword(e.target.value)}
            required
          />
        </div>
        <button className="acount-details-save-changes" disabled={loading}>
          {loading ? "Змінюємо пароль..." : "Змінити пароль"}
        </button>
      </form>
    </div>
  );
}
