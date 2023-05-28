import { NavLink } from "react-router-dom";

export const SideNavLeft = () => {
  return (
    <div className="flex flex-col gap-2.5 pl-[45px]">
      <NavLink
        to="/profile/"
        className={({ isActive }) => (isActive ? "text-[#4174F6] font-normal text-sm underline-offset-1" : "font-normal text-sm")}
      >
        Мій аккаунт
      </NavLink>
      <NavLink
        to="/profile/history"
        className={({ isActive }) => (isActive ? "text-[#4174F6] font-normal text-sm underline-offset-1" : "font-normal text-sm")}
      >
        Архів подій
      </NavLink>
    </div>
  );
};
