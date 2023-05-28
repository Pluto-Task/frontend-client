import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedCity: "Київ",
};

const userSlice = createSlice({
  name: "user-slice",
  initialState,
  reducers: {
    setSelectedCity: (state, action) => {
      state.selectedCity = action.payload;
    },
  },
});

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;
