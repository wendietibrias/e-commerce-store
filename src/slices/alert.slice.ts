import { createSlice } from "@reduxjs/toolkit";

export type AlertState = {
    message:string;
    variant:string;
    open:boolean;
}

const initialState : AlertState = {
    message:"",
    variant:"",
    open:false
}

const alertSlice = createSlice({
    name:'alert',
    initialState,
    reducers:{
        openAlert(state : AlertState, { payload }){
            state.message = payload?.message;
            state.open = true;
            state.variant = payload?.variant;

            return state;
        },
        closeAlert(state : AlertState){
            state.open = false;
            state.message = "";
            state.variant = "";

            return state;
        }
    }
});

export const { openAlert,closeAlert } = alertSlice.actions;
export default alertSlice.reducer;