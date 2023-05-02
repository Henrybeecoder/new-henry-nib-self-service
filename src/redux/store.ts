import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./global";

export default configureStore({
  reducer: {
    globalState: globalReducer,
    // global: globalReducer,
  },
});
