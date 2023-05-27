import { createSlice } from "@reduxjs/toolkit";
import { isTokenValid } from "../../helpers";

const initialState = {
  isAuth: localStorage.getItem("token")
    ? isTokenValid(localStorage.getItem("token")!)
    : false,
  alert: { status: false, type: null, text: null },
};

const globalSlice = createSlice({
  name: "global-slice",
  initialState,
  reducers: {
    setIsAuth: (state, action) => {
      state.isAuth = action.payload;
    },
    setAlert: (state, action) => {
      state.alert = action.payload;
    },
  },
});

export const globalActions = globalSlice.actions;
export const globalReducer = globalSlice.reducer;
