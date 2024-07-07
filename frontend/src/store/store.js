import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice.js'
const rootReducer = {
    auth: authReducer,

}

export const store = configureStore({
    reducer: rootReducer,
})