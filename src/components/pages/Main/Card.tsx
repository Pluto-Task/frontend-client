import { Link } from "react-router-dom";
import { skillsIcons } from "../../../data";
import uuid from "react-uuid";

const Card = (props: any) => {
  const { data } = props;
  const { title, description, phone, skills, startDate, id } = data;

  let daysToEvent = new Date(startDate).getDate() - new Date().getDate();
  daysToEvent = Number(daysToEvent.toString());

  return (
    <>
      <Link to={`/event/${id}`} onClick={() => window.scrollTo(0, 0)}>
        <div className="p-[20px] bg-[#F7F9FE]">
          <div className="flex justify-between">
            <div className="text-[42px] font-[500] text-[#212529]">{title}</div>
            <div className="text-[20px] font-[500] text-[#212529]">
              {daysToEvent < 0 && `${-daysToEvent} днів тому`}
              {daysToEvent > 0 && `${+daysToEvent} днів`}
            </div>
          </div>
          <div className="text-[#868E96] text-[20px] mt-[24px]">
            {description}
          </div>
          <div className="flex justify-between mt-[64px]">
            <div className="text-[24px] text-[#212529]">{phone}</div>
            <ul className="flex items-center gap-[15px]">
              {skills.map((skill: any) => {
                const { id } = skill;
                return <li key={uuid()}>{skillsIcons[id]}</li>;
              })}
            </ul>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Card;
