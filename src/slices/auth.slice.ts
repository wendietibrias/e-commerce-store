import { createSlice } from '@reduxjs/toolkit';
import jwtDecode from "jwt-decode";

export type AuthState = {
    token:string | null;
    payload: {
        name:string;
        email:string;
    } | null 
}

const userToken = JSON.parse(localStorage.getItem('wmart-user-token') || "null") || null;

const initialState : AuthState = {
    token:userToken,
    payload:userToken ? jwtDecode(userToken) : null
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setCredentials(state : AuthState , { payload }) {
            if(payload) {
                state.token = payload;
                state.payload = jwtDecode(payload);
                localStorage.setItem("wmart-user-token"  , JSON.stringify(payload));
            }
            return state;
        },
        removeCredentials(state : AuthState) {
            state.token = null;
            state.payload = null;
            localStorage.setItem("wmart-user-token" , JSON.stringify(null));
            return state;
        }
    }
});

export const { setCredentials,removeCredentials } = authSlice.actions;
export default authSlice.reducer;