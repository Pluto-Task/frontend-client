import { Link, useLocation } from "react-router-dom";
import Cross from "../../assets/svg/cross";
import { globalActions } from "../../redux/features/globalSlice";
import { useDispatch } from "react-redux";

const NavBar = () => {
  const location = useLocation();
  const navItems = [
    {
      link: "/events",
      title: "Івенти",
      total: 100,
    },
    {
      link: "/offers",
      title: "Пропозиції",
      total: 50,
    },
  ];

  const { setIsAddEvent } = globalActions;
  const dispatch = useDispatch();

  return (
    <>
      <div className="w-full grid grid-navbar h-[120px] xl:h-[140px] grid-cols-3">
        {navItems.map((navItem) => {
          const { link, title, total } = navItem;

          return (
            <>
              <Link to={link}>
                <button
                  className={`${
                    location.pathname == link ? "navItem--active" : ""
                  } navItem h-full w-full px-[10px] relative`}
                >
                  <span className="navItem-title">{title}</span>
                  <span className="navItem-total absolute bottom-[22px] left-[25px] text-[16px]">
                    {total}
                  </span>
                </button>
              </Link>
            </>
          );
        })}
        <button
          className="flex justify-center items-center"
          onClick={() => dispatch(setIsAddEvent(true))}
        >
          <Cross
            className={
              "w-[24px] h-[24px] xl:w-[56px] xl:h-[56px] rotate-[-45deg]"
            }
          />
        </button>
      </div>
    </>
  );
};

export default NavBar;
