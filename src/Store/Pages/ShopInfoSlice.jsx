import { createSlice } from "@reduxjs/toolkit";

export const ShopInfoSlice = createSlice({
  name: "shopInfo",
  initialState: {
    value: JSON.parse(localStorage.getItem("shopInfo")) ?? {
        shop:{
          
        }
    },
  },
  reducers: {
    setShop: (state, action) => {
      state.value.shop = action.payload;
      localStorage.setItem("shopInfo", JSON.stringify(state.value.shop));
  
    },
    setUserInfo: (state, action) => {
      state.value = { shop: state.value.shop, ...action.payload };
      localStorage.setItem("userInfo", JSON.stringify(state.value));
    },
    clearShop: (state) => {
     
      localStorage.removeItem("shopInfo");
        state.value.shop = "";
    },
  },
});

export default ShopInfoSlice.reducer;