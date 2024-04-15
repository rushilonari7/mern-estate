import { createSlice } from "@reduxjs/toolkit";

const initialState={
    currentUser:null,
    error:null,
    loading:false,
};

const userSlice=createSlice({
    name:'user',
    initialState,
   reducers:{
    signInStart:(state)=>{
        state.loading=true;
    },
    signInSuccess:(state,action)=>{
        state.currentUser=action.payload;
        state.loading=false;
        state.error=null;
    },
    signInFailuer:(state,action)=>{
        state.error=action.payload;
        state.loading=false;
    },
    updateUserStart:(state)=>{
       state.loading=true;
    },
    updateUserSuccess:(state,action)=>{
        state.currentUser=action.payload;
        state.loading=false;
        state.error=null;
    },
    updateUserFailuer:(state,action)=>{
         state.error=action.payload;
         state.loading=false;
    },
    deleteUserStart:(state)=>{
         state.loading=true;
    },
    deleteUserSuccess:(state,action)=>{
        state.currentUser=action.payload;
        state.loading=false;
        state.error=null
    },
    deleteUserFailuer:(state,action)=>{
        state.error=action.payload;
        state.loading=false
    },
    signoutStart:(state)=>{
        state.loading=true
    },
    signoutSuccess:(state,action)=>{
        state.currentUser=action.payload;
        state.loading=false;
        state.error=null
    },
    signoutFailuer:(state,action)=>{
        state.error=action.payload;
        state.loading=false
    }
    
   }
});
export const {
    signInStart,
    signInSuccess,
    signInFailuer,
    updateUserStart,
    updateUserSuccess,
    updateUserFailuer,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailuer,
    signoutStart,
    signoutSuccess,
    signoutFailuer}=userSlice.actions;

export default userSlice.reducer ;