import { Link } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { globalActions } from "../../../redux/features/globalSlice";
import { axiosClient } from "../../../App";
import CustomInput from "../../custom/CustomInput";
import CustomBtn from "../../custom/CustomBtn";
import Mail from "../../../assets/svg/mail";
import Lock from "../../../assets/svg/lock";


const SignInForm = () => {
  const dispatch = useDispatch();
  const { setAlert, setIsAuth } = globalActions;

  const [email, setEmail] = useState({
    value: "",
    message: "",
    isError: false,
  });
  const [password, setPassword] = useState({
    value: "",
    message: "",
    isError: false,
  });

  const loginRequest = async () => {
    const response = await axiosClient.post(
      "/User/login",
      {
        Email: email.value,
        Password: password.value,
      },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    return response.data;
  };

  const { mutate } = useMutation(loginRequest, {
    onError: (e: any) => {
      dispatch(
        setAlert({ status: true, type: "error", text: e.response.data.detail })
      );
    },
    onSuccess: (responseData) => {
      localStorage.setItem("token", responseData);
      dispatch(setIsAuth(responseData));
    },
  });

  const handlerSubmit = (e: any) => {
    e.preventDefault();

    if (email.value == "" || password.value == "") {
      if (email.value == "") {
        setEmail((prev) => {
          const copy = { ...prev };
          copy.isError = true;
          copy.message = "Please enter your mail";
          return copy;
        });
      }
      if (password.value == "") {
        setPassword((prev) => {
          const copy = { ...prev };
          copy.isError = true;
          copy.message = "Please enter your password";
          return copy;
        });
      }
      return;
    }

    mutate();
  };

  const handleOnFocus = (e: any) => {
    if (e.target.dataset.name == "email") {
      setEmail((prev) => {
        const copy = { ...prev };
        copy.isError = false;
        copy.message = "";
        return copy;
      });
    }
    if (e.target.dataset.name == "password") {
      setPassword((prev) => {
        const copy = { ...prev };
        copy.isError = false;
        copy.message = "";
        return copy;
      });
    }
  };

  return (
    <>
      <h1 className="font-[700] text-[36px] text-[#212B36] leading-[43.5px]">
        Sign In
      </h1>
      <div className="mt-[60px]">
        <form className="flex flex-col" onSubmit={(e) => handlerSubmit(e)}>
          <div className="flex flex-col gap-[40px]">
            <CustomInput
              required
              onFocus={(e: any) => handleOnFocus(e)}
              data-name="email"
              className={"w-full"}
              label="Email"
              type={"text"}
              {...email}
              icon={<Mail className={"fill-[#64748B] opacity-50"} />}
            />
            <CustomInput
              required
              onFocus={(e: any) => handleOnFocus(e)}
              data-name="password"
              className={"w-full"}
              label="Password"
              type={"password"}
              {...password}
              icon={<Lock className={"fill-[#64748B]"} />}
            />
          </div>
          <div className="flex flex-col mt-[60px]">
            <CustomBtn
              type="submit"
              className="bg-blue-700 hover:bg-blue-800 text-white"
            >
              Sign In
            </CustomBtn>
          </div>
          <div className="mt-[25px] text-center leading-[20px]">
            <div className="text-[#64748B]">
              Don’t have any account?{" "}
              <span className="text-[#3056D3]">
                <Link to={"/sign-up"}>Sign Up</Link>
              </span>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignInForm;
