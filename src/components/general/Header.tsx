// const CityInput = ()=>{
//   re
// }

import { useDispatch, useSelector } from "react-redux";
import NavBar from "./NavBar";
import { userActions } from "../../redux/features/userSlice";
import { useRef, useState } from "react";
import useDetectLeave from "../../custom-hooks/useDetectLeave";
import Cross from "../../assets/svg/cross";

const CityInput = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { selectedCity } = useSelector((state: any) => state.user);
  const { setSelectedCity } = userActions;
  const dispatch = useDispatch();

  console.log(selectedCity);

  const [input, setInput] = useState(selectedCity);
  const inputRef = useRef<HTMLInputElement>(null);
  const inputWrapper = useRef(null);

  useDetectLeave(inputWrapper, () => {
    if (input != "") {
      setInput(selectedCity);
    }
    setIsEditing(false);
  });

  return (
    <>
      <form
        ref={inputWrapper}
        className="relative flex items-center"
        onSubmit={(e) => {
          e.preventDefault();
          if (input != "") {
            dispatch(setSelectedCity(input));
          }
          if (inputRef.current) {
            inputRef.current.blur();
          }

          setIsEditing(false);
        }}
      >
        <input
          required
          ref={inputRef}
          placeholder="Введіть місто"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          onClick={() => {
            setIsEditing(true);
          }}
          className="w-full h-[99%] outline-none border-none text-[86px] pl-[10px] pr-[80px]"
        />
        {isEditing && (
          <>
            <Cross
              onClick={() => setInput("")}
              className={
                "w-[22px] h-[22px] absolute right-[20px] cursor-pointer"
              }
            />
          </>
        )}
      </form>
    </>
  );
};

const Header = () => {
  return (
    <>
      <header className="h-[160px] flex border-b border-[#000000]">
        <div className="grid grid-header h-full w-full">
          <CityInput />
          <NavBar />
        </div>
      </header>
    </>
  );
};

export default Header;
