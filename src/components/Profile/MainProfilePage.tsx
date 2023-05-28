import { SideNavRight } from "./SideNavRight/SideNavRight";
import { SideLeft } from "./SideLeft/SideLeft";
import { Outlet } from "react-router-dom";

export const MainProfilePage = () => {
  return (
    <div className="flex min-h-screen pt-[24px]">
      <div className="flex-[1_1_20%]">
        <SideLeft />
      </div>
      <div className="flex-[1_1_60%]">
        <Outlet />
      </div>
      <div className="flex-[1_1_20%]">
        <SideNavRight />
      </div>
    </div>
  );
};
