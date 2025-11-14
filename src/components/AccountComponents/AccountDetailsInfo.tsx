/* eslint-disable react-hooks/set-state-in-effect */
import { RootState } from "@/redux/pamplabua/store";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export function AccountDetailsInfo() {
  const { accountInfo } = useSelector((store: RootState) => store.uiSlice);

  const [newData, setNewData] = useState({
    name: "",
    surname: "",
    middleName: "",
    phoneNumber: "",
  });

  const [dateBirthday, setDateBirthday] = useState<{
    day: number | null | string;
    month: number | null | string;
    year: number | null | string;
  }>({
    day: "",
    month: "",
    year: "",
  });

  useEffect(() => {
    if (accountInfo) {
      setNewData({
        name: accountInfo.name ?? "",
        surname: accountInfo.surname ?? "",
        middleName: accountInfo.middleName ?? "",
        phoneNumber: accountInfo.phoneNumber ?? "",
      });

      if (accountInfo.dateBirthday) {
        const date = new Date(accountInfo.dateBirthday);
        setDateBirthday({
          day: date.getDate().toString(),
          month: (date.getMonth() + 1).toString(),
          year: date.getFullYear().toString(),
        });
      }
    }
  }, [accountInfo]);

  const updateAccountData = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      const dayNum = Number(dateBirthday.day);
      const monthNum = Number(dateBirthday.month);
      const yearNum = Number(dateBirthday.year);

      console.log(dayNum, monthNum, yearNum);

      if (!dayNum || !monthNum || !yearNum) {
        toast("Введіть дані для дати народження");
        return;
      }

      if (
        isNaN(dayNum) ||
        dayNum < 1 ||
        dayNum > 31 ||
        isNaN(monthNum) ||
        monthNum < 1 ||
        monthNum > 12 ||
        isNaN(yearNum) ||
        yearNum < 1900
      ) {
        toast("Введіть коректні дані для дати народження");
        return;
      }

      const Birthday = `${dateBirthday.year?.toString()}-${dateBirthday.month
        ?.toString()
        .padStart(2, "0")}-${dateBirthday.day?.toString().padStart(2, "0")}`;

      const res = await axios.post("/api/auth/update-user-info", {
        ...newData,
        dateBirthday: Birthday,
      });
      if (res.status === 200) {
        toast.success("Данні успішно змінені");
      }
    } catch (error) {
      console.error("Помилка при оновленні користувача:", error);

      if (axios.isAxiosError(error)) {
        toast(error.response?.data?.error || "Помилка при оновленні даних");
      } else {
        toast("Сталася невідома помилка, спробуйте пізніше");
      }
    }
  };

  return (
    <div>
      <h2 className="fs-xl font-bold uppercase">деталі користувача</h2>
      <form className="account-details-info-form" onSubmit={updateAccountData}>
        <div className="acount-details-row">
          <div className="acount-details-row-input-wrapper">
            <label htmlFor="" className="fs-sm font-semibold">
              Прізвище
            </label>
            <input
              type="text"
              placeholder="Прізвище"
              value={newData.surname}
              onChange={(e) => {
                setNewData({ ...newData, surname: e.target.value });
              }}
            />
          </div>
          <div className="acount-details-row-input-wrapper">
            <label htmlFor="" className="fs-sm font-semibold">
              Ім’я
            </label>
            <input
              type="text"
              placeholder="Ім’я"
              value={newData.name}
              onChange={(e) => {
                setNewData({ ...newData, name: e.target.value });
              }}
            />
          </div>
        </div>
        <div className="acount-details-row">
          <div className="acount-details-row-input-wrapper">
            <label htmlFor="" className="fs-sm font-semibold">
              По-батькові
            </label>
            <input
              type="text"
              placeholder="По-батькові"
              value={newData.middleName}
              onChange={(e) => {
                setNewData({ ...newData, middleName: e.target.value });
              }}
            />
          </div>
          <div className="acount-details-row-input-wrapper">
            <label htmlFor="" className="fs-sm font-semibold">
              Дата народження
            </label>
            <div className="acount-details-row-input-wrapper-date-of-birth">
              <input
                type="number"
                placeholder="День"
                min={1}
                max={31}
                value={
                  dateBirthday.day !== ""
                    ? String(dateBirthday.day).padStart(2, "0")
                    : ""
                }
                onChange={(e) => {
                  const val = Number(e.target.value);
                  if (isNaN(val)) return;
                  setDateBirthday({ ...dateBirthday, day: val });
                }}
              />

              <input
                type="number"
                placeholder="Місяць"
                min={1}
                max={12}
                value={
                  dateBirthday.month !== ""
                    ? String(dateBirthday.month).padStart(2, "0")
                    : ""
                }
                onChange={(e) => {
                  const val = Number(e.target.value);
                  if (isNaN(val)) return;
                  setDateBirthday({ ...dateBirthday, month: val });
                }}
              />
              <input
                type="number"
                min={1900}
                placeholder="Рік"
                value={dateBirthday.year!}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  if (isNaN(val)) return; // якщо не число, нічого не робимо
                  setDateBirthday({ ...dateBirthday, year: val });
                }}
              />
            </div>
          </div>
        </div>
        <div className="acount-details-row-input-wrapper">
          <label htmlFor="" className="fs-sm font-semibold">
            Номер телефону
          </label>
          <input
            type="text"
            placeholder="Номер телефону"
            value={newData.phoneNumber}
            onChange={(e) =>
              setNewData({ ...newData, phoneNumber: e.target.value })
            }
          />
        </div>
        <button className="acount-details-save-changes">зберегти зміни</button>
      </form>
    </div>
  );
}
