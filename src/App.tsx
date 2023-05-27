import { useSelector } from "react-redux";
import axios from "axios";
import Layout from "./components/Wrappers/Layout";
import SignWrapper from "./components/Wrappers/SignWrapper";
import { Navigate, Route, Routes } from "react-router";
import SignUp from "./components/Sign/SignUp/SignUp";
import SignIn from "./components/Sign/SignIn/SignIn";
import Main from "./components/pages/Main/Main";
import { useQuery } from "react-query";
import { MainProfilePage } from "./components/Profile/MainProfilePage";

export const axiosClient = axios.create({
  baseURL: "https://pluto.somee.com/api",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

const App = () => {
  const { isAuth } = useSelector((state: any) => state.global);

  useQuery("fetch-skills");

  return (
    <>
      <Layout>
        {!isAuth ||
          (false && (
            <>
              <SignWrapper>
                <Routes>
                  <Route path="/sign-in" element={<SignIn />} />
                  <Route path="/sign-up" element={<SignUp />} />
                  <Route
                    path="*"
                    element={<Navigate to="/sign-in" replace />}
                  />
                </Routes>
              </SignWrapper>
            </>
          ))}
        {isAuth ||
          (true && (
            <>
              <Routes>
                <Route path="/profile" element={<MainProfilePage />} />
                <Route path="/events" element={<Main />} />
                <Route path="/offers" element={<Main />} />
                <Route path="*" element={<Navigate to="/events" replace />} />
              </Routes>
            </>
          ))}
      </Layout>
    </>
  );
};

export default App;
