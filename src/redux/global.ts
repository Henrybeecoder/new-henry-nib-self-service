import { createSlice } from "@reduxjs/toolkit";
//bvn-validation otp validated
export const globalSlice = createSlice({
  name: "global",
  initialState: {
    accountType: "",
    step: "validated",
  },
  reducers: {
    setDetails: (state, action) => {
      state.accountType = action.payload;
    },
    setStep: (state, action) => {
      state.step = action.payload;
    },
  },
});

export const { setDetails, setStep } = globalSlice.actions;

export default globalSlice.reducer;
