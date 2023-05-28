import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Layout from "./components/Wrappers/Layout";
import SignWrapper from "./components/Wrappers/SignWrapper";
import { Navigate, Route, Routes } from "react-router";
import SignUp from "./components/Sign/SignUp/SignUp";
import SignIn from "./components/Sign/SignIn/SignIn";
import Main from "./components/pages/Main/Main";
import { useQuery } from "react-query";
import { MainProfilePage } from "./components/Profile/MainProfilePage";
import { GeneralInformation } from "./components/Profile/GeneralInformation/GeneralInformation";
import { ArchiveEvents } from "./components/Profile/ArchiveEvents/ArchiveEvents";
import { globalActions } from "./redux/features/globalSlice";
import Information from "./components/Information/Information";
import Alert from "./components/custom/Alert";

export const axiosClient = axios.create({
  baseURL: "https://pluto.somee.com/api",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Authorization": `Bearer ${localStorage.getItem("token")}`,
  },
});

const App = () => {
  const { isAuth } = useSelector((state: any) => state.global);
  const dispatch = useDispatch();
  const { setSkillsList } = globalActions;

  const fetchSkills = async () => {
    const response = await axios.get(
      "https://pluto.somee.com/api/skill/getAll",
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    return response.data;
  };

  useQuery("fetch-skills", fetchSkills, {
    onSuccess: (responseData) => {
      dispatch(setSkillsList(responseData));
    },
  });

  return (
    <>
      <Layout>
        {!isAuth && (
          <>
            <SignWrapper>
              <Routes>
                {/* <Route path="*" element={<Navigate to="/events" replace />} /> */}

                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="*" element={<Navigate to="/sign-in" replace />} />
              </Routes>
            </SignWrapper>
          </>
        )}
        {isAuth && (
          <>
            <Routes>
              <Route path="/profile" element={<MainProfilePage />}>
                <Route path="/profile" element={<GeneralInformation />} />
                <Route path="/profile/history" element={<ArchiveEvents />} />
              </Route>
              <Route path="/event/:id" element={<Information />} />
              <Route path="/events" element={<Main />} />
              <Route path="/offers" element={<Main />} />
              <Route path="*" element={<Navigate to="/events" replace />} />
            </Routes>
          </>
        )}
      </Layout>
      <Alert />
    </>
  );
};

export default App;
