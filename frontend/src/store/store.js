import { configureStore } from "@reduxjs/toolkit";
import searchReducer from './searchSlice.js'
import authReducer from './authSlice.js'
const rootReducer = {
    auth: authReducer,
    search: searchReducer

}

export const store = configureStore({
    reducer: rootReducer,
})