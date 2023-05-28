import { useSelector } from "react-redux";
import Header from "../../general/Header";
import PopUp from "../../PopUp";
import AddEventForm from "../../AddEvent/AddEventForm";
import { Link } from "react-router-dom";
import { useState } from "react";
import { skillsIcons } from "../../../data";
import Slider from "../../custom/SlideBart";

const FilterBlock = (props: any) => {
  const { filter, setFilter } = props;
  const { skillsList } = useSelector((state: any) => state.global);

  if (!skillsList) return <></>;
  return (
    <>
      <div className="grid grid-cols-2 max-w-[581px] gap-x-[50px] gap-y-[39px] w-full">
        {skillsList.map((skill: any) => {
          const { id, name } = skill;
          return (
            <div key={id} className="flex items-center">
              <div
                className="flex items-center gap-[17px]"
                onClick={() =>
                  setFilter((prev: any) => {
                    const copy = { ...prev };

                    if (copy.skills.includes(id)) {
                      copy.skills = copy.skills.filter(
                        (skillId: string) => skillId != id
                      );
                    } else {
                      copy.skills = [...copy.skills, id];
                    }
                    return copy;
                  })
                }
              >
                <input
                  type="checkbox"
                  checked={filter.skills.includes(id)}
                  onChange={() => {}}
                  className="w-[24px] h-[24px] rounded-[4px] accent-[#222222]"
                />
                <div className="flex gap-[8px] items-center">
                  {skillsIcons[id]}
                  <h4 className="text-[20px] whitespace-nowrap">
                    {skill.name}
                  </h4>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

const Main = () => {
  const { isAddEvent } = useSelector((state: any) => state.global);
  const [filter, setFilter] = useState({
    skills: [],
    countOfPeople: 0,
  });

  return (
    <>
      <Header />
      <main className="flex flex-col ">
        <div className="flex justify-between">
          <div className="flex gap-[80px] mt-[36px]">
            <Link to="/history" className="text-[20px] text-black">
              Архів подій
            </Link>
            <Link to="/account" className="text-[20px] text-black">
              Мій акаунт
            </Link>
          </div>
        </div>
        <div className="flex w-full mt-[64px]">
          <FilterBlock filter={filter} setFilter={setFilter} />
        </div>
      </main>
      {isAddEvent && (
        <>
          <PopUp>
            <div className="max-w-[500px] w-full ">
              <AddEventForm />
            </div>
          </PopUp>
        </>
      )}
    </>
  );
};

export default Main;
