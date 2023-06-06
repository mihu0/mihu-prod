import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/User"
import cartReducer from "../features/Cart";
export const store = configureStore({
    reducer:{
        user: userReducer,
        cart: cartReducer,
    }
});