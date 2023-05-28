import { useEffect, useState } from "react";
import { UserSkill } from "../SignUpForm";
import { numberValid } from "../../../../helpers";

const SkillListOption = (props: {
  handleCheck: Function;
  skill: string;
  isChecked: boolean;
  setSkills: Function;
}) => {
  const { handleCheck, skill, isChecked, setSkills } = props;
  const [input, setInput] = useState<string>("");

  const changeSkillExp = () => {
    setSkills((prev: UserSkill[]) => {
      if (prev && prev.length != 0) {
        const copy = [...prev];

        const toEdit = copy.find((copy: UserSkill) => copy.skill == skill);
        toEdit!.exp = Number(input);
        return copy;
      }
      return prev;
    });
  };
  useEffect(() => {
    changeSkillExp();
  }, [input]);

  return (
    <>
      <li className="flex items-center justify-between">
        <div
          className="flex items-center gap-[17px]"
          onClick={() => handleCheck(skill)}
        >
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => {}}
            className="w-[24px] h-[24px] rounded-[4px] accent-[#222222]"
          />
          <h4 className="text-[20px]">{skill}</h4>
        </div>
        {isChecked && (
          <>
            <input
              className="w-[40px] rounded-[4px] border outline-[2px] focus:outline-blue-700"
              required
              type="text"
              value={input}
              onChange={(e) => setInput(numberValid(e.target.value))}
            />
          </>
        )}
      </li>
    </>
  );
};

export default SkillListOption;
