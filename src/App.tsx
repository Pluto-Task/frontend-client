import { useSelector } from "react-redux";
import axios from "axios";
import Layout from "./components/Wrappers/Layout";
import SignWrapper from "./components/Wrappers/SignWrapper";
import { Navigate, Route, Routes } from "react-router";
import SignUp from "./components/Sign/SignUp/SignUp";
import SignIn from "./components/Sign/SignIn/SignIn";

export const axiosClient = axios.create({
  baseURL: "http://pluto.somee.com/api",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

const App = () => {
  const { isAuth } = useSelector((state: any) => state.global);
  return (
    <>
      <Layout>
        {!isAuth && (
          <>
            <SignWrapper>
              <Routes>
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="*" element={<Navigate to="/sign-in" replace />} />
              </Routes>
            </SignWrapper>
            
          </>
        )}
        {isAuth && <></>}
      </Layout>
    </>
  );
};

export default App;
