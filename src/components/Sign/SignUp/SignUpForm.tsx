import { useMutation } from "react-query";
import { axiosClient } from "../../../App";
import { useState } from "react";
import { globalActions } from "../../../redux/features/globalSlice";
import { useDispatch } from "react-redux";
import CustomInput from "../../custom/CustomInput";
import { Link } from "react-router-dom";
import CustomBtn from "../../custom/CustomBtn";
import SkillList from "./SkillList/SkillList";

export type UserSkill = {
  skill: string;
  exp: number;
};

const SignUpForm = () => {
  const dispatch = useDispatch();
  const { setIsAuth, setAlert } = globalActions;
  const [currentStep, setCurrentStep] = useState(1);

  const [name, setName] = useState({
    value: "",
    message: "",
    isError: false,
  });
  const [phone, setPhone] = useState({
    value: "",
    message: "",
    isError: false,
  });
  const [email, setEmail] = useState({
    value: "",
    message: "",
    isError: false,
  });
  const [password1, setPassword1] = useState({
    value: "",
    message: "",
    isError: false,
  });

  const [password2, setPassword2] = useState({
    value: "",
    message: "",
    isError: false,
  });

  const [skills, setSkills] = useState<UserSkill[]>([]);

  const submitForm = async () => {
    const response = await axiosClient.post("/User/register", {});
    return response.data;
  };

  const { mutate: submitMutate } = useMutation(submitForm, {
    onError: (e: any) => {
      dispatch(
        setAlert({ status: true, type: "error", text: e.response.data.detail })
      );
    },
    onSuccess: (responseData: any) => {
      dispatch(setIsAuth(true));
      localStorage.setItem("token", responseData);
    },
  });

  const onSubmit = async (e: any) => {
    e.preventDefault();
    submitMutate();
  };

  const validInputs = () => {
    let isChanged = false;

    if (name.value == "") {
      setName((prev) => {
        const copy = { ...prev };
        copy.isError = true;
        copy.message = "Введіть ім'я";
        return copy;
      });
      isChanged = true;
    }

    if (phone.value == "") {
      setPhone((prev) => {
        const copy = { ...prev };
        copy.isError = true;
        copy.message = "Введіть номер";
        return copy;
      });
      isChanged = true;
    }

    if (email.value == "") {
      setEmail((prev) => {
        const copy = { ...prev };
        copy.isError = true;
        copy.message = "Введіть пошту";
        return copy;
      });
      isChanged = true;
    }

    if (password1.value != password2.value) {
      setPassword1((prev) => {
        const copy = { ...prev };
        copy.isError = true;
        return copy;
      });
      setPassword2((prev) => {
        const copy = { ...prev };
        copy.isError = true;
        copy.message = "Паролі не одинакові";
        return copy;
      });
      isChanged = true;
    }

    if (isChanged) return;

    setCurrentStep((prev) => prev + 1);
  };

  const handleOnFocus = () => {
    setName((prev) => {
      const copy = { ...prev };
      copy.isError = false;
      copy.message = "";
      return copy;
    });
    setPhone((prev) => {
      const copy = { ...prev };
      copy.isError = false;
      copy.message = "";
      return copy;
    });

    setEmail((prev) => {
      const copy = { ...prev };
      copy.isError = false;
      copy.message = "";
      return copy;
    });

    setPassword1((prev) => {
      const copy = { ...prev };
      copy.isError = false;
      copy.message = "";
      return copy;
    });
    setPassword2((prev) => {
      const copy = { ...prev };
      copy.isError = false;
      copy.message = "";
      return copy;
    });
  };

  return (
    <>
      <form className="mt-[60px]" onSubmit={(e) => onSubmit(e)}>
        {currentStep == 1 && (
          <>
            <h1 className="font-[700] text-[36px] text-[#212B36] leading-[43.5px]">
              Sign Up
            </h1>
            <div className="flex flex-col mt-[60px]">
              <div className="flex flex-col gap-[40px]">
                <CustomInput
                  {...name}
                  required
                  onChange={(e: any) => {
                    setName((prev) => {
                      const copy = { ...prev };
                      copy.value = e.target.value;
                      return copy;
                    });
                  }}
                  className={"w-full"}
                  label="Ім'я"
                  type={"text"}
                  data-name="name"
                  onFocus={() => handleOnFocus()}
                  // icon={<PersonIcon className={"fill-[#64748B] opacity-40"} />}
                />
                <CustomInput
                  {...email}
                  required
                  onChange={(e: any) => {
                    setEmail((prev) => {
                      const copy = { ...prev };
                      copy.value = e.target.value;
                      return copy;
                    });
                  }}
                  className={"w-full"}
                  label={"Пошта"}
                  type={"email"}
                  data-name="email"
                  onFocus={() => handleOnFocus()}
                  // icon={<EnvelopeIcon className={"fill-[#64748B] opacity-40"} />}
                />
                <CustomInput
                  {...phone}
                  required
                  onChange={(e: any) => {
                    setPhone((prev) => {
                      const copy = { ...prev };
                      copy.value = e.target.value;
                      return copy;
                    });
                  }}
                  className={"w-full"}
                  label={"Телефон"}
                  type={"telephone"}
                  data-name="phone"
                  onFocus={() => handleOnFocus()}
                  // icon={<EnvelopeIcon className={"fill-[#64748B] opacity-40"} />}
                />
                <CustomInput
                  {...password1}
                  required
                  onChange={(e: any) => {
                    setPassword1((prev) => {
                      const copy = { ...prev };
                      copy.value = e.target.value;
                      return copy;
                    });
                  }}
                  className={"w-full"}
                  label="Пароль"
                  type={"password"}
                  onFocus={() => handleOnFocus()}
                  // icon={<LockerIcon className={"fill-[#64748B]"} />}
                />
                <CustomInput
                  {...password2}
                  onChange={(e: any) => {
                    setPassword2((prev) => {
                      const copy = { ...prev };
                      copy.value = e.target.value;
                      return copy;
                    });
                  }}
                  required
                  className={"w-full"}
                  label="Повторіть пароль"
                  type={"password"}
                  onFocus={() => handleOnFocus()}
                  // icon={<LockerIcon className={"fill-[#64748B]"} />}
                />
              </div>
              <div className="mt-[60px]">
                <CustomBtn
                  type="button"
                  onClick={() => validInputs()}
                  className="bg-blue-700 hover:bg-blue-800 text-white w-full"
                >
                  Продовжити
                </CustomBtn>
              </div>
            </div>
            <div className="mt-[25px] text-center leading-[20px]">
              <div className="text-[#64748B]">
                Don’t have any account?{" "}
                <span className="text-[#3056D3]">
                  <Link to={"/sign-in"}>Sign in</Link>
                </span>
              </div>
            </div>
          </>
        )}
        {currentStep == 2 && (
          <>
            <SkillList skills={skills} setSkills={setSkills} />
            <CustomBtn
              type="submit"
              className="bg-blue-700 hover:bg-blue-800 text-white w-full mt-[32px]"
            >
              Зареєструватися
            </CustomBtn>
          </>
        )}
      </form>
    </>
  );
};

export default SignUpForm;
