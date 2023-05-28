import { useState, useMemo } from "react";
import CustomInput from "../custom/CustomInput";
import { globalActions } from "../../redux/features/globalSlice";
import { useDispatch, useSelector } from "react-redux";
import CustomDatePicker from "../custom/CustomDatePicker";
import CustomTextArea from "../custom/CustomTextArea";
import CustomBtn from "../custom/CustomBtn";
import { UserSkill } from "../Sign/SignUp/SignUpForm";
import SkillListOption from "../Sign/SignUp/SkillList/SkillListOption";

const ReturnSvg = () => {
  return (
    <svg
      width="19"
      height="21"
      viewBox="0 0 19 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 6.49994V10.4999L0 5.49994L6 0.499939V4.49994H11C13.1217 4.49994 15.1566 5.34279 16.6569 6.84308C18.1571 8.34338 19 10.3782 19 12.4999C19 14.6217 18.1571 16.6565 16.6569 18.1568C15.1566 19.6571 13.1217 20.4999 11 20.4999H2V18.4999H11C12.5913 18.4999 14.1174 17.8678 15.2426 16.7426C16.3679 15.6174 17 14.0912 17 12.4999C17 10.9086 16.3679 9.38252 15.2426 8.2573C14.1174 7.13208 12.5913 6.49994 11 6.49994H6Z"
        fill="black"
      />
    </svg>
  );
};

const AddEventForm = () => {
  const { setIsAddEvent } = globalActions;
  const { skillsList } = useSelector((state: any) => state.global);

  const dispatch = useDispatch();

  const [currentStep, setCurrentStep] = useState(1);

  const [title, setTitle] = useState({
    value: "",
    message: "",
    isError: false,
  });
  const [description, setDescription] = useState({
    value: "",
    message: "",
    isError: false,
  });
  const [phone, setPhone] = useState({
    value: "",
    message: "",
    isError: false,
  });
  const [countOfPeople, setCountOfPeople] = useState({
    value: "",
    message: "",
    isError: false,
  });
  const [startDate, setStartDate] = useState({
    value: "",
    message: "",
    isError: false,
  });
  const [finishDate, setFinishDate] = useState({
    value: "",
    message: "",
    isError: false,
  });
  const [skills, setSkills] = useState<UserSkill[]>([]);
  const [coordinates, setCoordinate] = useState({ x: "", y: "" });

  const titles = ["Створення події", "Навики учасників", "Локація"];

  const selectedSkills: number[] = useMemo(() => {
    if (skills.length != 0) {
      return skills.map((skill) => skill.skill);
    }
    return [];
  }, [skills]);

  const handleCheck = (skillClicked: number) => {
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
      <form
        className="px-[30px] py-[15px] bg-white min-h-[500px] rounded-[6px]"
        onSubmit={(e) => {
          e.preventDefault();
          console.log("Submited");
        }}
      >
        <div className="flex flex-col">
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => {
                if (currentStep == 1) dispatch(setIsAddEvent(false));
                setCurrentStep((prev) => prev - 1);
              }}
            >
              <ReturnSvg />
            </button>

            <div>{titles[currentStep - 1]}</div>
            <div>{`${currentStep}/3`}</div>
          </div>
          {currentStep == 1 && (
            <>
              <div className="flex flex-col gap-[40px] mt-[42px]">
                <CustomInput
                  value={title.value}
                  onChange={(e: any) => {
                    setTitle((prev) => {
                      const copy = { ...prev };
                      copy.value = e.target.value;
                      return copy;
                    });
                  }}
                  label={"Назва"}
                />
                <CustomTextArea
                  className={"min-h-[80px] max-h-[80px]"}
                  value={description.value}
                  onChange={(e: any) => {
                    setDescription((prev) => {
                      const copy = { ...prev };
                      copy.value = e.target.value;
                      return copy;
                    });
                  }}
                  label={"Короткий опис івенту"}
                />
                <CustomInput
                  value={phone.value}
                  onChange={(e: any) => {
                    setPhone((prev) => {
                      const copy = { ...prev };
                      copy.value = e.target.value;
                      return copy;
                    });
                  }}
                  label={"Контактний телефон"}
                />
                <CustomInput
                  label={"Кількість людей"}
                  value={countOfPeople.value}
                  onChange={(e: any) => {
                    setCountOfPeople((prev) => {
                      const copy = { ...prev };
                      copy.value = e.target.value;
                      return copy;
                    });
                  }}
                />
                <CustomDatePicker
                  value={startDate.value}
                  onChange={(e: any) => {
                    setStartDate((prev) => {
                      const copy = { ...prev };
                      copy.value = e.target.value;
                      return copy;
                    });
                  }}
                  label={"Час початку"}
                />
                <CustomDatePicker
                  value={finishDate.value}
                  onChange={(e: any) => {
                    setFinishDate((prev) => {
                      const copy = { ...prev };
                      copy.value = e.target.value;
                      return copy;
                    });
                  }}
                  label={"Час кінця"}
                />
                <CustomBtn
                  type="button"
                  className={"bg-blue-700 text-white"}
                  onClick={() => setCurrentStep((prev) => prev + 1)}
                >
                  Далі
                </CustomBtn>
              </div>
            </>
          )}
          {currentStep == 2 && (
            <>
              <div className="flex flex-col w-full mt-[22px]">
                <div className="flex flex-col w-full gap-[16px]">
                  <div className="flex justify-end text-[14px] text-[#343A40]">
                    Досвід у рокaх:
                  </div>
                  <ul className="flex flex-col w-full gap-[39px]">
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
                <CustomBtn
                  type="button"
                  className={"bg-blue-700 text-white mt-[35px]"}
                  onClick={() => setCurrentStep((prev) => prev + 1)}
                >
                  Далі
                </CustomBtn>
              </div>
            </>
          )}
          {currentStep == 3 && <></>}
        </div>
      </form>
    </>
  );
};

export default AddEventForm;
