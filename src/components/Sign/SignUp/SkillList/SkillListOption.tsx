import { useEffect, useState, useRef } from "react";
import { UserSkill } from "../SignUpForm";
import { numberValid } from "../../../../helpers";
import { skillsIcons } from "../../../../data";

const SkillListOption = (props: {
  handleCheck: Function;
  skill: any;
  isChecked: boolean;
  setSkills: Function;
}) => {
  const { handleCheck, skill, isChecked, setSkills } = props;
  const [input, setInput] = useState<string>("");

  return (
    <>
      <li className="flex items-center justify-between">
        <div
          className="flex items-center gap-[17px]"
          onClick={() => handleCheck(skill.id)}
        >
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => {}}
            className="w-[24px] h-[24px] rounded-[4px] accent-[#222222]"
          />
          <div className="flex items-center gap-[10px]">
            {skillsIcons[skill.id]}
            <h4 className="text-[20px]">{skill.name}</h4>
          </div>
        </div>
        {isChecked && (
          <>
            <input
              className="w-[40px] rounded-[4px] border outline-[2px] focus:outline-blue-700"
              type="text"
              value={input}
              onChange={(e) => {
                setInput(numberValid(e.target.value));
                setSkills((prev: UserSkill[]) => {
                  console.log("Exp");
                  if (prev && prev.length != 0) {
                    const copy = [...prev];
                    const toEdit = copy.find(
                      (copyItem: UserSkill) => copyItem.skill == skill.id
                    );
                    toEdit!.exp = Number(numberValid(e.target.value));
                    return copy;
                  }
                  return prev;
                });
              }}
            />
          </>
        )}
      </li>
    </>
  );
};

export default SkillListOption;
