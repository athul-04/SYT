import {React} from 'react'
import {createSlice} from '@reduxjs/toolkit'
import {configureStore} from '@reduxjs/toolkit'


const userSlice=createSlice({
    name:'user',
    initialState:{username:"",password:"",confirmPassword:""},
    reducers:{
        assignName(state,actions){
            state.username=actions.payload.username;
        },
        assignPassword(state,actions){
            state.password=actions.payload.password;
        },
        assignConfirmPassword(state,actions){
            state.confirmPassword=actions.payload.confirmPassword;
        },
        reFrame(state){
            state.username="";
            state.password="";
            state.confirmPassword="";
        }
    }
});


export const userActions=userSlice.actions;


const store=configureStore({
    reducer:{user:userSlice.reducer},
})


export default store;