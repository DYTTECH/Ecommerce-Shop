import { createSlice } from "@reduxjs/toolkit";

const ProductDetailsSlice = createSlice({
	name: "productdetails",
	initialState: {
		value: {
		},
	},
	reducers: {
		set: (state, action) => {
			state.value = action.payload;
		},
		reset: (state) => {
			state.value = {
			};
		},
		
	},
});
export default ProductDetailsSlice.reducer;