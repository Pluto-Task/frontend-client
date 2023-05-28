import { useEffect, useMemo, useState } from "react";
import { UserSkill } from "../SignUpForm";
import SkillListOption from "./SkillListOption";
import { useQuery } from "react-query";
import axios from "axios";
import { axiosClient } from "../../../../App";
import { useSelector } from "react-redux";

const SkillList = (props: { skills: UserSkill[]; setSkills: Function }) => {
  const { skills, setSkills } = props;
  const { skillsList } = useSelector((state: any) => state.global);

  const selectedSkills: number[] = useMemo(() => {
    if (skills.length != 0) {
      return skills.map((skill) => skill.skill);
    }
    return [];
  }, [skills]);

  const handleCheck = (skillClicked: number) => {
    console.log(skillClicked);
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
              skillsList.map((skill: any) => {
                return (
                  <>
                    <SkillListOption
                      isChecked={selectedSkills.includes(skill.id)}
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
