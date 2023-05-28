import { useQuery } from "react-query";
import { axiosClient } from "../../../App";
import Card from "../../pages/Main/Card";
import axios from "axios";

export const ArchiveEvents = () => {
  const fetchRegistered = async () => {
    const response = await axios.get(
      "https://pluto.somee.com/api/userEvent/getUserEvents",
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
  const fetchCreated = async () => {
    const response = await axios.get(
      "https://pluto.somee.com/api/userEvent/getCreatedByUser",
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

  const { data: registeredEvents } = useQuery(
    "fetch-reigstered",
    fetchRegistered
  );
  const { data: createdEvents } = useQuery("fetch-created", fetchCreated);

  return (
    <div className="h-full overflow-auto">
      <div className="flex flex-col">
        <p className="text-4xl text-[#ADB5BD] font-semibold mb-[40px]">
          Події на які я зареєструвався
        </p>
        <ul className="flex flex-col gap-[50px]">
          {registeredEvents &&
            registeredEvents.events.map((event: any) => {
              return <Card key={event.id} data={event} />;
            })}
        </ul>
      </div>
      <div className="flex flex-col mt-[40px]">
        <p className="text-4xl text-[#ADB5BD] font-semibold mb-[40px]">
          Події, які я створив
        </p>
        <ul className="flex flex-col gap-[50px]">
          {createdEvents &&
            createdEvents.events.map((event: any) => {
              return <Card key={event.id} data={event} />;
            })}
        </ul>
      </div>
    </div>
  );
};
