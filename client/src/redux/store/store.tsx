import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../reducers/loginSlice.tsx";
import UploadReducer from "../reducers/uploadSlice.tsx";
export const store = configureStore({
    reducer : {
        user : loginReducer,
        upload: UploadReducer
    }
});