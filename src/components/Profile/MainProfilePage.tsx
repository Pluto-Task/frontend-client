import { SideNavLeft } from "./SideNavLeft/SideNavLeft";
import { SideRight } from "./SideRight/SideRight";
import { Outlet } from "react-router-dom";

export const MainProfilePage = () => {
  return (
    <div className="flex h-screen pt-[24px]">
      <div className="flex-[1_1_20%]">
        <SideRight />
      </div>
      <div className="flex-[1_1_60%]">
        <Outlet />
      </div>
      <div className="flex-[1_1_20%]">
        <SideNavLeft />
      </div>
    </div>
  );
};
