import { createSlice } from "@reduxjs/toolkit";

export const accountOpeningSlice = createSlice({
  name: "accountOpening",
  initialState: {
    accountType: "",
    accountOpeningStep: "bvn-validation",
  },
  reducers: {
    setAccountOpeningDetails: (state, action) => {
      state.accountType = action.payload;
    },
    setAccountOpeningStep: (state, action) => {
      state.accountOpeningStep = action.payload;
    },
  },
});

export const { setAccountOpeningDetails, setAccountOpeningStep } =
  accountOpeningSlice.actions;

export default accountOpeningSlice.reducer;
