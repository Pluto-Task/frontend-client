import { createSlice } from "@reduxjs/toolkit";
import { isTokenValid } from "../../helpers";

const initialState = {
  isAuth: localStorage.getItem("token")
    ? isTokenValid(localStorage.getItem("token")!)
    : false,
  alert: { status: false, type: null, text: null },
  isAddEvent: false,
  skillsList: null,
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
    setIsAddEvent: (state, action) => {
      state.isAddEvent = action.payload;
    },
    setSkillsList: (state, action) => {
      state.skillsList = action.payload;
    },
  },
});

export const globalActions = globalSlice.actions;
export const globalReducer = globalSlice.reducer;
