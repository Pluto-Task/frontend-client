import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";

interface User {
  email: string;
  name: string;
  phone: string;
  skills: Skill[];
  dateCreated: string;
  rating: number;
  ratingCount: number;
  numberOfEventsTookPart: number;
  numberOfEventsCreated: number;
}

interface Skill {
  id: number;
  experienceYears: number;
}

const userTemp:User = {
  email: "smth@out.com",
  name: "TestName2",
  phone: "123456",
  skills: [
    {
      id: 10,
      experienceYears: 10,
    },
    {
      id: 1,
      experienceYears: 5.1,
    },
  ],
  dateCreated: "2023-05-27T22:33:39.2219891",
  rating: 3.3,
  ratingCount: 3,
  numberOfEventsTookPart: 0,
  numberOfEventsCreated: 0,
};

export const GeneralInformation = () => {
  const [user, setUser] = useState<User | undefined>(undefined);

  const fetchSkills = async () => {
    const response = await axios.get("https://pluto.somee.com/api/user/get", {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
    return response.data;
  };

  useQuery("fetch-skills", fetchSkills, {
    onSuccess: (responseData) => {
      setUser(responseData);
    },
  });

  if (user === undefined) {
    setUser(userTemp);
    // return <>Not found</>
  }

  return (
    <div className="relative h-full">
      <p className="text-4xl text-[#ADB5BD] font-semibold mb-[40px]">
        Загальна інформація
      </p>
      <div>
        <label htmlFor="price" className="mb-[10px]">
          Ім'я
        </label>
        <div>
          <input
            type="text"
            name="name"
            id="name"
            value={user?.name}
            className="rounded h-[52px] pt-[16px] pr-[12px] pb-[16px] pl-[12px] w-full border-2 border-[#E1E7EF] focus:border-[#1D4ED7] focus:border-2"
          />
        </div>
      </div>
      <div className="mt-[40px]">
        <label htmlFor="price" className="mb-[10px]">
          Email
        </label>
        <div>
          <input
            type="email"
            name="email"
            id="email"
            value={user?.email}
            className="rounded h-[52px] pt-[16px] pr-[12px] pb-[16px] pl-[12px] w-full border-2 border-[#E1E7EF] focus:border-[#1D4ED7] focus:border-2"
          />
        </div>
      </div>
      <div className="mt-[40px]">
        <label htmlFor="price" className="mb-[10px]">
          Телефон
        </label>
        <div>
          <input
            type="tel"
            name="phone"
            id="phone"
            value={user?.phone}
            className="rounded h-[52px] pt-[16px] pr-[12px] pb-[16px] pl-[12px] w-full border-2 border-[#E1E7EF] focus:border-[#1D4ED7] focus:border-2"
          />
        </div>
      </div>
      <button
        type="submit"
        className="absolute bottom-3 bg-[#4174F6] w-full h-[60px] rounded text-white font-normal text-xl"
      >
        Submit
      </button>
    </div>
  );
};
