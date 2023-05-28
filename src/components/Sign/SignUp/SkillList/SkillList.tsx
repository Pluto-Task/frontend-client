import { useEffect, useMemo, useState } from "react";
import { UserSkill } from "../SignUpForm";
import SkillListOption from "./SkillListOption";
import { useQuery } from "react-query";
import axios from "axios";
import { axiosClient } from "../../../../App";

const SkillList = (props: { skills: UserSkill[]; setSkills: Function }) => {
  const { skills, setSkills } = props;

  console.log(skills);

  const selectedSkills: string[] = useMemo(() => {
    if (skills.length != 0) {
      return skills.map((skill) => skill.skill);
    }
    return [];
  }, [skills]);

  const [skillsList, setSkillsList] = useState<string[] | null>(null);

  const handleCheck = (skillClicked: string) => {
    if (skills.some((skill) => skill.skill == skillClicked)) {
      setSkills((prev: UserSkill[]) => {
        const copy = [...prev];
        return copy.filter((skill) => skill.skill != skillClicked);
      });
    } else {
      setSkills((prev: UserSkill[]) => [
        ...prev,
        { skill: skillClicked, exp: 0 },
      ]);
    }
  };

  const fetchSkills = async () => {
    const response = await axios.get(
      "https://pluto.somee.com/api/skill/getAll",
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    return response.data;
  };

  useQuery("fetch-skills", fetchSkills, {
    onSuccess: (responseData) => {
      setSkillsList(responseData);
    },
  });

  return (
    <>
      <div className="max-w-[428px] w-full flex flex-col gap-[26px]">
        <div className="flex flex-col gap-[10px]">
          <h1 className="font-[700] text-[#212B36] text-[36px]">Навики</h1>
          <h4 className="text-[#64748B] text-[14px]">
            Обери чим ти можеш бути корисним
          </h4>
        </div>
        <div className="flex flex-col gap-[16px]">
          <div className="flex justify-end text-[14px] text-[#343A40]">
            Досвід у рокaх:
          </div>
          <ul className="flex flex-col gap-[39px]">
            {skillsList &&
              skillsList.map((skill: string) => {
                return (
                  <>
                    <SkillListOption
                      isChecked={selectedSkills.includes(skill)}
                      handleCheck={handleCheck}
                      skill={skill}
                      setSkills={setSkills}
                    />
                  </>
                );
              })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default SkillList;
