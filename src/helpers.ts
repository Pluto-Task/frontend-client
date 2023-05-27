import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { globalActions } from "./redux/features/globalSlice";

export const isTokenValid = (token: string) => {
  try {
    const decoded: any = jwt_decode(token);
    const expirationTime = decoded.exp;
    const currentTime = Math.floor(Date.now() / 1000);

    const isAuth = currentTime < expirationTime;
    if (!isAuth) {
      localStorage.removeItem("token");
      return false;
    }
    return true;
  } catch (error: any) {
    console.error("Error decoding token:", error.message);
    return false;
  }
};

export const checkIsAuth = (error: any) => {
  const dispatch = useDispatch();
  const { setIsAuth } = globalActions;
  if (error.status == 401) {
    dispatch(setIsAuth(false));
  }
};
