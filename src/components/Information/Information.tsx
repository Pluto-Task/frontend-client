import MyMap from "../map/Map";
import { Link, useNavigate, useParams } from "react-router-dom";
import uuid from "react-uuid";
import { axiosClient } from "../../App";
import { useMutation, useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { skillsIcons } from "../../data";
import { globalActions } from "../../redux/features/globalSlice";
import { useState } from "react";

function Information() {
  const dispatch = useDispatch();

  const { setAlert } = globalActions;
  const { id: paramsId } = useParams();

  const [isDisabled, setIsDisabled] = useState(
    localStorage.getItem(paramsId!) ? true : false
  );

  const navigate = useNavigate();
  const fetchCard = async () => {
    const response = await axiosClient.get(`/userEvent/${paramsId}`);
    return response.data;
  };
  const { skillsList } = useSelector((state: any) => state.global);

  const { data } = useQuery("fetch-card", fetchCard);

  const bookEvent = async () => {
    const response = await axiosClient.get("/userEvent/book/" + paramsId);
    return response.data;
  };
  const { mutate } = useMutation(bookEvent, {
    onSuccess: () => {
      console.log("success");
      localStorage.setItem(paramsId!, "true");
      dispatch(
        setAlert({
          status: true,
          type: "success",
          text: "Ви успішно записались на захід",
        })
      );
    },
  });

  if (!data || !skillsList) return;
  const { title, description, phone, skills, startDate, email, build } = data;

  return (
    <>
      <div className="grid-information ">
        <div
          className="my-[40px] px-[25px] text-blue-700 cursor-pointer text-[20px]`"
          onClick={() => {
            navigate(-1);
          }}
        >
          Back
        </div>
        <div className="flex gap-[80px] items-center">
          <Link to="/profile/history" className="text-[20px] text-black">
            Архів подій
          </Link>
          <Link to="/profile" className="text-[20px] text-black">
            Мій профіль
          </Link>
        </div>
      </div>

      <div className="px-[25px]">
        <h1 className="text-8xl">{title}</h1>
        <div className="grid-information">
          <div className="mt-[115px]">
            <div>
              <p className="text-[20px] text-[#868E96]">Початок</p>
              <p className="text-base mt-[10px]">
                {new Date(startDate).toLocaleDateString()}
              </p>
            </div>
            <div className="mt-[147px]">
              <button
                disabled={isDisabled}
                className="border bg-[#4174F6] rounded-md text-[white] w-[300px] h-[50px]"
                onClick={() => {
                  mutate();
                  setIsDisabled(true);
                  localStorage.setItem(paramsId!, "true");
                }}
              >
                Записатись
              </button>
            </div>
          </div>
          <div>
            <div className="mt-[115px]">
              <p className="text-xl text-[#868E96]">Amenities</p>
              <div className="grid grid-cols-2 gap-[20px] mt-[15px] w-fit">
                {skills &&
                  skills.map((skill: any) => {
                    const { id, exp } = skill;
                    return (
                      <div key={uuid()} className="flex gap-[10px]">
                        <div className="flex">{skillsIcons[skill.id]}</div>
                        <div>
                          {skillsList &&
                            skillsList.find((skill: any) => skill.id == id)
                              .name}{" "}
                          - {`${exp} років`}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="flex items-center mt-[86px]">
              <div>
                <p className="text-xl">
                  Контактний <br />
                  телефон
                </p>
              </div>
              <div className="flex justify-center items-center bg-[black] h-[2px] w-[70%]"></div>
              <div>
                <p className="text-4xl justify-center items-center">{`${phone}`}</p>
              </div>
            </div>
            <div className="flex flex-col gap-[70px] mt-[174px]">
              <h1 className="text-[84px]">Коротний опис:</h1>
              <p className="text-[36px]">{description}</p>
            </div>
            <div className="mt-[132px]">
              <p className="text-[84px]">Контакти:</p>
            </div>
          </div>
        </div>

        <div>
          <div className="flex justify-center items-center bg-[black] h-[2px] w-[100%] mt-[5%] mb-[5%]"></div>
          <div className="grid-information  items-center">
            <p className="text-3xl">Телефон</p>
            <p className="text-[28px]">{phone}</p>
          </div>
          <div className="flex justify-center items-center bg-[black] h-[2px] w-[100%] mt-[5%] mb-[5%]"></div>
          <div className="grid-information items-center">
            <p className="text-3xl">Пошта</p>
            <p className="text-[28px]">{email}</p>
          </div>
          <div className="flex justify-center items-center bg-[black] h-[2px] w-[100%] mt-[5%] mb-[5%]"></div>
        </div>
        <div className="flex justify-center items-center pb-[70px] text-[80px]">
          <p className="">Вулиця</p>
          <p className="ml-[30px]">{build}</p>
        </div>
        <div>
          <MyMap />
        </div>
        <div className="flex mt-[10%] mb-[10%] gap-4  items-center">
          <div>
            <button
              disabled={isDisabled}
              onClick={() => {
                mutate();
                setIsDisabled(true);
                localStorage.setItem(paramsId!, "true");
              }}
              className="border bg-[#4174F6] rounded-md text-[white] w-[300px] h-[50px]"
            >
              Записатись
            </button>
          </div>
          <div>
            <p className="text-xl">
              Контактний <br />
              телефон
            </p>
          </div>
          <div className="flex justify-center items-center bg-[black] h-[2px] w-[70%]"></div>
          <div>
            <p className="text-4xl justify-center items-center">380962501688</p>
          </div>
        </div>
      </div>
    </>
  );
}
export default Information;
