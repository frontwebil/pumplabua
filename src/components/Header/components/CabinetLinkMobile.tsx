import { closeBurger, toggleAuthModal } from "@/redux/pamplabua/slices/uiSlice";
import { RootState } from "@/redux/pamplabua/store";
import { SITE_LINKS } from "@/site-config/site.config";
import Link from "next/link";
import { PiUserCircle } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";

export function CabinetLinkMobile() {
  const { userName, isLogged } = useSelector(
    (store: RootState) => store.uiSlice
  );

  const dispatch = useDispatch();

  const openAuthModal = () => {
    dispatch(closeBurger());
    dispatch(toggleAuthModal());
  };
  return (
    <>
      {!isLogged ? (
        <div className="burger-menu-func-row" onClick={openAuthModal}>
          <PiUserCircle className="burger-menu-func-icon" />
          <p className="fs-md uppercase font-bold">Персональний акаунт</p>
        </div>
      ) : (
        <Link
          href={SITE_LINKS.ACCOUNT}
          className="burger-menu-func-row"
          onClick={() => dispatch(closeBurger())}
        >
          <PiUserCircle className="burger-menu-func-icon" />
          <p className="fs-md uppercase font-bold">{userName}</p>
        </Link>
      )}
    </>
  );
}
