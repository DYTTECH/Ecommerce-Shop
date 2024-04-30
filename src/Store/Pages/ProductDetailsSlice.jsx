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
		favoriteItem: (state, action) => {
			console.log(action.payload);
			const index = Object.keys(state.value).findIndex((item) => item === action.payload);
			state.value[index] = {
				...state.value[index],
				is_favorite: !state.value[index].is_favorite,
			}
		}
		
	},
});
export default ProductDetailsSlice.reducer;