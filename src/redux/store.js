import { configureStore } from "@reduxjs/toolkit";
import accountOpeningReducer from "./accountOpening"

export default configureStore({
    reducer: {
        accountOpeningData: accountOpeningReducer
    }
})