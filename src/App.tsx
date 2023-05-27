import { useSelector } from "react-redux";
import axios from "axios";
import Layout from "./components/Wrappers/Layout";
import SignWrapper from "./components/Wrappers/SignWrapper";
import { Navigate, Route, Routes } from "react-router";
import SignUp from "./components/Sign/SignUp/SignUp";
import Sv from "./assets/sv";

export const axiosClient = axios.create({
  baseURL: "http://plutotest.somee.com/api",
  headers: {
    "Content-Type": "application/json",
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
                <Route path="/sign-in" element={<></>} />
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
