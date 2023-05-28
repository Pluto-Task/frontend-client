import { NavLink, useLocation } from "react-router-dom";

export const SideRight = () => {

  return (
    <div className="pl-[30px]">
      <h1 className="mb-[55px]">Pluto team</h1>
      <NavLink to="/events" className="font-normal text-[#4174F6] text-2xl">
        <code>&lt;</code>
        Back
      </NavLink>
    </div>
  );
};
