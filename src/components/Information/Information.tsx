import MyMap from "../map/Map";
import { Link, useParams } from "react-router-dom";
import uuid from "react-uuid";
import { axiosClient } from "../../App";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { skillsIcons } from "../../data";

function Information() {
  const { id: paramsId } = useParams();
  const fetchCard = async () => {
    const response = await axiosClient.get(`/userEvent/${paramsId}`);
    return response.data;
  };
  const { skillsList } = useSelector((state: any) => state.global);

  const { data } = useQuery("fetch-card", fetchCard);
  if (!data || !skillsList) return;

  const { title, description, phone, skills, startDate, email, build } = data;

  return (
    <>
      <Link to="/">
        <div className="my-[50px] px-[25px] text-blue-700">Back</div>
      </Link>
      <div className="px-[25px]">
        <h1 className="text-8xl">{title}</h1>

        <div className="flex gap-40 mt-[10%]">
          <div>
            <p className="text-xl text-[#868E96]">Початок</p>
            <p className="text-base">
              {new Date(startDate).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-xl text-[#868E96]">Amenities</p>
            <div className="grid grid-cols-2 gap-[20px] mt-[15px]">
              {skills &&
                skills.map((skill: any) => {
                  const { id, exp } = skill;

                  if (exp || id == 0) return;
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
        </div>
        <div className="flex mt-[10%] gap-4  items-center">
          <div>
            <button className="border bg-[#4174F6] rounded-md text-[white] w-[300px] h-[50px]">
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
            <p className="text-4xl justify-center items-center">{`${phone}`}</p>
          </div>
        </div>
        <div className="mt-[10%]">
          <div>
            <p className="text-6xl">Короткий опис:</p>
            <div className="mt-[3%]">
              <p className="text-2xl">{description}</p>
            </div>
          </div>
        </div>
        <div className="mt-[10%]">
          <p className="text-6xl">Контакти:</p>
        </div>
        <div>
          <div className="flex justify-center items-center bg-[black] h-[2px] w-[100%] mt-[5%] mb-[5%]"></div>
          <div className="flex  items-center">
            <p className="text-3xl">Телефон</p>
            <p className="ml-[35%]">{phone}</p>
          </div>
          <div className="flex justify-center items-center bg-[black] h-[2px] w-[100%] mt-[5%] mb-[5%]"></div>
          <div className="flex  items-center">
            <p className="text-3xl">Пошта</p>
            <p className="ml-[35%]">{email}</p>
          </div>
          <div className="flex justify-center items-center bg-[black] h-[2px] w-[100%] mt-[5%] mb-[5%]"></div>
          <div className="flex justify-center items-center">
            <p className="text-5xl">Вулиця</p>
            <p className="ml-[30px] text-[32px]">{build}</p>
          </div>
          <div className="flex justify-center items-center bg-[black] h-[2px] w-[100%] mt-[5%] mb-[5%]"></div>
        </div>
        <div>
          <MyMap />
        </div>
        <div className="flex mt-[10%] mb-[10%] gap-4  items-center">
          <div>
            <button className="border bg-[#4174F6] rounded-md text-[white] w-[300px] h-[50px]">
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
