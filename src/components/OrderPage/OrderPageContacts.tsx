import {
  setName,
  setSurname,
  setMiddleName,
  setPhoneNumber,
  setEmail,
} from "@/redux/pamplabua/slices/orderSlice";
import { RootState } from "@/redux/pamplabua/store";
import { useDispatch, useSelector } from "react-redux";

export function OrderPageContacts() {
  const { name, surname, middleName, phoneNumber, email } = useSelector(
    (store: RootState) => store.OrderProductsSlice
  );
  const dispatch = useDispatch();
  return (
    <>
      <h2 className="font-bold uppercase fs-md">Контактні дані замовника</h2>

      <div className="OrderPage-content-row">
        <div className="OrderPage-content-group">
          <label>Прізвище</label>
          <input
            type="text"
            placeholder="Паспортні дані"
            value={surname}
            onChange={(e) => dispatch(setSurname(e.target.value))}
            required
          />
        </div>

        <div className="OrderPage-content-group">
          <label>Імʼя</label>
          <input
            type="text"
            placeholder="Паспортні дані"
            value={name}
            onChange={(e) => dispatch(setName(e.target.value))}
            required
          />
        </div>

        <div className="OrderPage-content-group">
          <label>По-батькові</label>
          <input
            type="text"
            placeholder="Паспортні дані"
            value={middleName}
            onChange={(e) => dispatch(setMiddleName(e.target.value))}
            required
          />
        </div>
      </div>

      <div className="OrderPage-content-row">
        <div className="OrderPage-content-group">
          <label>Номер телефону</label>
          <input
            type="tel"
            placeholder="+38 (000) 000 00 00"
            value={phoneNumber}
            onChange={(e) => dispatch(setPhoneNumber(e.target.value))}
            required
          />
        </div>

        <div className="OrderPage-content-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => dispatch(setEmail(e.target.value))}
            required
          />
        </div>
      </div>
    </>
  );
}
