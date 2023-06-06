import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    isUserLoggedIn: false,
    user:{}
}
const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        login:(state,action)=>{
            state.isUserLoggedIn = true
            state.user= action.payload
        },
        logout:(state)=>{
            state.isUserLoggedIn = false
            state.user = {}
        }
    }
});

export default userSlice.reducer
export const {login,logout}  = userSlice.actions