import { Link } from "react-router-dom";

export const SideLeft = () => {

  return (
    <div className="pl-[30px]">
      <h1 className="mb-[55px]">Pluto team</h1>
      <Link to="/events" className="font-normal text-[#4174F6] text-2xl">
        <code>&lt;</code>
        Back
      </Link>
    </div>
  );
};
