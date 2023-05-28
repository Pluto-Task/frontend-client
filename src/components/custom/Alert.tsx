import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { globalActions } from "../../redux/features/globalSlice";

const Alert = () => {
  const {
    alert: { type, text, status },
  } = useSelector((state: any) => state.global);

  const { setAlert } = globalActions;
  const { alert } = useSelector((state: any) => state.global);
  const dispatch = useDispatch();

  const styleObject: { [key: string]: any } = {
    info: "",
    danger: {
      svg: "fill-[#F98080]",
      block: "bg-[#FDF2F2] text-[#9B1C1C] border-[#F8B4B4]",
    },
    success: {
      svg: "#31C48D",
      block: "bg-[#F3FAF7] text-[#03543F] border-[#84E1BC]",
    },
    error: {
      svg: "#F98080",
      block: "bg-[#FDF2F2] text-[#9B1C1C] border-[#F8B4B4]",
    },
    dark: {},
  };

  const styles = styleObject[type];

  useEffect(() => {
    if (alert.status) {
      const timeout = setTimeout(() => {
        dispatch(setAlert({ status: false, type: null, text: null }));
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [alert]);

  if (!status) {
    return;
  }

  return (
    <>
      <div className="fixed top-[10px] left-0 w-full flex justify-center font-inter">
        <div
          className={`text-[14px] pt-[15px] pr-[15px] pb-[17px] pl-[17px] flex gap-[17px] items-center border rounded-[8px] absolute ${styles.block}`}
          role={type}
        >
          {/* <InfoIcon fill={styles.svg} className="w-[20px]" /> */}
          <div className="text-[14px]">
            <span className="font-medium">
              {`${type.charAt(0).toUpperCase()}${type.slice(1)}`}!
            </span>
            {text}
          </div>
        </div>
      </div>
    </>
  );
};

export default Alert;
