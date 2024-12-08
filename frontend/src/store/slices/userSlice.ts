import { PayloadAction } from './../../../node_modules/@reduxjs/toolkit/src/createAction';
import { createSlice } from "@reduxjs/toolkit";

interface User {
  _id:string,
  name: string,
  email: string,
  

}

interface UserState {
  user:User|null,
  loading:boolean
}

const initialState:UserState={
  user:null,
  loading:false
}

const userSlice = createSlice({
  name:"user",
  initialState,
  reducers:{
    setUser:(state,action:PayloadAction<User>)=>{
      state.user=action.payload;
    },
    setLoading:(state,action:PayloadAction<boolean>)=>{
      state.loading=action.payload;
    }
  }
})

export default userSlice.reducer
export const {setUser,setLoading}=userSlice.actions