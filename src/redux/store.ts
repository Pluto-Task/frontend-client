import { configureStore } from "@reduxjs/toolkit";
import { globalReducer } from "./features/globalSlice";
import { useReducer } from "react";
import { userReducer } from "./features/userSlice";

const store = configureStore({
  reducer: {
    global: globalReducer,
    user: userReducer,
  },
});

export default store;
