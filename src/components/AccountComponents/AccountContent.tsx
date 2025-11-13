import "@/components/AccountComponents/AccountComponents.css";
import { setAccountInfo } from "@/redux/pamplabua/slices/uiSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AccountNav } from "./AccountNav";
import { AccountDetailsInfo } from "./AccountDetailsInfo";
import { AcountDetailsResetPassword } from "./AcountDetailsResetPassword";

export function AccountContent() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await axios.get("/api/auth/user-info");
        dispatch(setAccountInfo(res.data));
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserInfo();
  }, [dispatch]);

  return (
    <div className="container">
      <div className="account-content">
        <AccountNav />
        <div className="acount-details">
          <AccountDetailsInfo />
          <AcountDetailsResetPassword />
        </div>
      </div>
    </div>
  );
}
