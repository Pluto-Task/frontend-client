import { NavLink } from "react-router-dom";
import CustomBtn from "../../custom/CustomBtn";
import { globalActions } from "../../../redux/features/globalSlice";
import { useDispatch } from "react-redux";

export const SideNavRight = () => {
  const { setIsAuth } = globalActions;
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col gap-2.5 pl-[45px]">
      <NavLink
        to="/profile/"
        className={({ isActive }) =>
          isActive
            ? "text-[#4174F6] font-normal text-sm underline-offset-1"
            : "font-normal text-sm"
        }
      >
        Мій аккаунт
      </NavLink>
      <NavLink
        to="/profile/history"
        className={({ isActive }) =>
          isActive
            ? "text-[#4174F6] font-normal text-sm underline-offset-1"
            : "font-normal text-sm"
        }
      >
        Архів подій
      </NavLink>
      <CustomBtn
        className={"text-red-700 font-[600] text-left px-[5px] py-0"}
        onClick={() => {
          localStorage.clear();
          dispatch(setIsAuth(false));
        }}
      >
        Log out
      </CustomBtn>
    </div>
  );
};
