import { useSelector } from "react-redux";
import Header from "../../general/Header";
import PopUp from "../../PopUp";
import AddEventForm from "../../AddEvent/AddEventForm";

const Main = () => {
  const { isAddEvent } = useSelector((state: any) => state.global);
  return (
    <>
      <Header />
      {isAddEvent && (
        <>
          <PopUp>
            <div className="max-w-[448px] w-full ">
              <AddEventForm />
            </div>
          </PopUp>
        </>
      )}
    </>
  );
};

export default Main;
