import { useSelector } from "react-redux";
import Header from "../../general/Header";
import PopUp from "../../PopUp";
import AddEventForm from "../../AddEvent/AddEventForm";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { skillsIcons } from "../../../data";
import Slider from "../../custom/SlideBart";
import MyMap from "../../map/Map";
import { axiosClient } from "../../../App";
import { useMutation, useQuery } from "react-query";
import Card from "./Card";
import uuid from "react-uuid";
import { numberValid } from "../../../helpers";
import CustomBtn from "../../custom/CustomBtn";
import MyMapInfo from "../../map/MapInfo";

const FilterBlock = (props: any) => {
  const { filter, setFilter } = props;
  const { skillsList } = useSelector((state: any) => state.global);

  if (!skillsList) return <></>;
  return (
    <>
      <div className="md:grid md:grid-cols-2 flex flex-col xl:max-w-[581px] gap-x-[50px] gap-y-[39px] w-full h-fit">
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
  const isFirstRender = useRef(true);

  const { isAddEvent } = useSelector((state: any) => state.global);
  const [filter, setFilter] = useState({
    skills: [],
    countOfPeople: 0,
  });
  const [cards, setCards] = useState<any[] | null>(null);
  const [filteredCards, setFilteredCards] = useState<any[] | null>([]);
  const [isSkillsFilter, setIsSkillsFilter] = useState(false);

  const fetchCards = async () => {
    const response = await axiosClient.get("/userEvent/getAll", {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  };

  const { data, refetch } = useQuery("fetch-cards", fetchCards, {
    onSuccess: (responseData) => {},
  });

  const fetchFilteredCards = async () => {
    const response = await axiosClient.post(
      "/userEvent/getByFilter",
      {
        "city": "Kyiv",
        maxPeople: filter.countOfPeople,
        skills: filter.skills,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  };

  const { data: filteredData, refetch: filteredCardsRefetch } = useQuery(
    "fetch-filtered-cards",
    fetchFilteredCards
  );

  useEffect(() => {
    filteredData && setFilteredCards(filteredData.events);
  }, [filteredData]);

  useEffect(() => {
    data && setCards(data.events);
  }, [data]);

  useEffect(() => {
    refetch();
  }, [isAddEvent]);

  return (
    <>
      <Header />
      <main className="flex flex-col px-[25px]">
        <div className="flex flex-col sm:flex-row sm:flex sm:justify-center gap-[30px] xl:justify-between mt-[36px] items-center">
          <div className="flex gap-[30px] flex-wrap items-center">
            <Slider
              changeCountOfPeople={(value: any) => {
                setFilter((prev) => {
                  const copy = { ...prev };
                  copy.countOfPeople = Number(numberValid(value));
                  return copy;
                });
              }}
            />
            {/* <div className="flex gap-[15px]">
              Кількість людей:{" "}
              <input
                className="w-[50px] border rounded-[6px]"
                type="text"
                value={filter.countOfPeople}
                onChange={(e) => {
                  setFilter((prev) => {
                    const copy = { ...prev };
                    copy.countOfPeople = Number(numberValid(e.target.value));
                    return copy;
                  });
                }}
              />
            </div> */}
            <div className="flex gap-[20px] w-fit">
              <CustomBtn
                onClick={() => setIsSkillsFilter(!isSkillsFilter)}
                className={"bg-neutral-800 max-w-[150px] text-[#fff]"}
              >
                {isSkillsFilter ? "Карта" : "Фільтр"}
              </CustomBtn>
              <CustomBtn
                onClick={() => {
                  filteredCardsRefetch();
                }}
                className={"bg-blue-700 max-w-[150px] w-full text-[#fff]"}
              >
                Шукати
              </CustomBtn>
            </div>
          </div>
          <div className="flex gap-[80px]">
            <Link to="/profile/history" className="text-[20px] text-black">
              Архів подій
            </Link>
            <Link to="/profile" className="text-[20px] text-black">
              Мій профіль
            </Link>
          </div>
        </div>
        <div className="sm:flex-col xl:flex-col items-center xl:items-start xl:flex-none  xl:grid xl:grid-cols-2 gap-[30px] w-full mt-[64px]">
          {!isSkillsFilter && <MyMapInfo className={""} />}
          {isSkillsFilter && (
            <FilterBlock filter={filter} setFilter={setFilter} />
          )}
          <ul className="flex flex-col gap-[50px] w-[100%]">
            {cards &&
              cards.map((card: any) => {
                return <Card key={uuid()} data={card} />;
              })}
          </ul>
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
