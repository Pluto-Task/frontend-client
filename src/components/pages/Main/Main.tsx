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

const FilterBlock = (props: any) => {
  const { filter, setFilter } = props;
  const { skillsList } = useSelector((state: any) => state.global);

  if (!skillsList) return <></>;
  return (
    <>
      <div className="grid grid-cols-2 max-w-[581px] gap-x-[50px] gap-y-[39px] w-full h-fit">
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

  const fetchCards = async () => {
    const response = await axiosClient.get("/userEvent/getAll");
    return response.data;
  };

  const { data, refetch } = useQuery("fetch-cards", fetchCards, {
    onSuccess: (responseData) => {
      console.log("Success");
    },
  });

  const fetchFilteredCards = async () => {
    const response = await axiosClient.post("/userEvent/getByFilter", {
      "city": "Kyiv",
      maxPeople: filter.countOfPeople,
      skills: filter.skills,
    });
    return response.data;
  };

  const { data: filteredData, refetch: filteredCardsRefetch } = useQuery(
    "fetch-filtered-cards",
    fetchFilteredCards
  );

  useEffect(() => {
    filteredData && setFilteredCards(filteredData.events);
  }, [filteredData]);

  console.log(filteredCards);

  useEffect(() => {
    data && setCards(data.events);
  }, [data]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (isAddEvent == false) {
      refetch();
    }
  }, [isAddEvent]);

  return (
    <>
      <Header />
      <main className="flex flex-col px-[25px]">
        <div className="flex justify-between mt-[36px] items-center">
          <div className="flex gap-[30px] items-center">
            <div className="flex gap-[15px]">
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
            </div>
            <CustomBtn
              onClick={() => {
                filteredCardsRefetch();
              }}
              className={"bg-blue-700 max-w-[150px] w-full text-[#fff]"}
            >
              Шукати
            </CustomBtn>
          </div>
          <div className="flex gap-[80px]">
            <Link to="/history" className="text-[20px] text-black">
              Архів подій
            </Link>
            <Link to="/profile" className="text-[20px] text-black">
              Мій акаунт
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-[30px] w-full mt-[64px]">
          {/* <MyMap className={"flex-1 h-[770px]"} /> */}
          <FilterBlock filter={filter} setFilter={setFilter} />
          <ul className="flex flex-col gap-[50px]">
            {filteredCards!.length == 0 ? (
              <>
                {cards &&
                  cards.map((card: any) => {
                    return <Card key={uuid()} data={card} />;
                  })}
              </>
            ) : (
              <>
                {filteredCards &&
                  filteredCards.map((card: any) => {
                    return <Card key={uuid()} data={card} />;
                  })}
              </>
            )}
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
