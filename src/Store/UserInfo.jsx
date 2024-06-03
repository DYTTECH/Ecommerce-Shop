import { createSlice } from "@reduxjs/toolkit";

export const userInfo = createSlice({
  name: "userInfo",
  initialState: {
    value: JSON.parse(localStorage.getItem("userinfo")) ?? {
        access: "",
        user:{
          
        }
        
    },
  },
  reducers: {
    setToken: (state, action) => {
      state.value.access = action.payload;
      localStorage.setItem("userinfo", JSON.stringify(state.value.access));
  
    },
    setUserInfo: (state, action) => {
      state.value = { token: state.value.access, ...action.payload };
      localStorage.setItem("userDetails", JSON.stringify(state.value));
    },
    
    // setUserAddresses: (state, action) => {
    //   state.value = { token: state.value.access, ...action.payload };
    //   localStorage.setItem("userAddresses", JSON.stringify(state.value));
    // },
    logout: (state) => {
     
      localStorage.removeItem("userinfo");
        state.value.access = "";
    },
  },
});

export default userInfo.reducer;