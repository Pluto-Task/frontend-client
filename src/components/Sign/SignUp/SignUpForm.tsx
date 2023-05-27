import { useMutation } from "react-query";
import { axiosClient } from "../../../App";
import { useState } from "react";
import { globalActions } from "../../../redux/features/globalSlice";
import { useDispatch } from "react-redux";
import CustomInput from "../../custom/CustomInput";
import { Link } from "react-router-dom";
import CustomBtn from "../../custom/CustomBtn";

const SignUpForm = () => {
  const dispatch = useDispatch();

  const { setIsAuth, setAlert } = globalActions;

  const [name, setName] = useState({
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

  const submitForm = async () => {
    const response = await axiosClient.post("/register", {});
    return response.data;
  };

  const { mutate: submitMutate } = useMutation(submitForm, {
    onError: (error: any) => {
      dispatch(
        setAlert({ status: true, type: "error", message: "Виникла помилка" })
      );
    },
    onSuccess: (responseData: any) => {
      dispatch(setIsAuth(true));
      localStorage.setItem("token", responseData);
    },
  });

  const onSubmit = async (e: any) => {
    e.preventDefault();

    if (password1.value != password2.value) {
      return;
    }
    submitMutate();
  };

  return (
    <>
      <h1 className="font-[700] text-[36px] text-[#212B36] leading-[43.5px]">
        Sign Up
      </h1>
      <div className="mt-[60px]">
        <form className="flex flex-col" onSubmit={(e) => onSubmit(e)}>
          <div className="flex flex-col gap-[40px]">
            <CustomInput
              {...name}
              onChange={(e: any) => {
                setName((prev) => {
                  const copy = { ...prev };
                  copy.value = e.target.value;
                  return copy;
                });
              }}
              className={"w-full"}
              label="Name"
              type={"text"}
              data-name="name"
              // icon={<PersonIcon className={"fill-[#64748B] opacity-40"} />}
            />
            <CustomInput
              {...email}
              onChange={(e: any) => {
                setEmail((prev) => {
                  const copy = { ...prev };
                  copy.value = e.target.value;
                  return copy;
                });
              }}
              className={"w-full"}
              label={"Email"}
              type={"email"}
              data-name="email"
              // icon={<EnvelopeIcon className={"fill-[#64748B] opacity-40"} />}
            />
            <CustomInput
              {...password1}
              onChange={(e: any) => {
                setPassword1((prev) => {
                  const copy = { ...prev };
                  copy.value = e.target.value;
                  return copy;
                });
              }}
              className={"w-full"}
              label="Password"
              type={"password"}
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
              className={"w-full"}
              label="Re-type Password"
              type={"password"}
              // icon={<LockerIcon className={"fill-[#64748B]"} />}
            />
          </div>
          <div className="flex flex-col mt-[60px]">
            <CustomBtn
              type="submit"
              className="bg-blue-700 hover:bg-blue-800 text-white"
            >
              Sign Up
            </CustomBtn>
          </div>
          <div className="mt-[25px] text-center leading-[20px]">
            <div className="text-[#64748B]">
              Don’t have any account?{" "}
              <span className="text-[#3056D3]">
                <Link to={"/sign-in"}>Sign in</Link>
              </span>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUpForm;
