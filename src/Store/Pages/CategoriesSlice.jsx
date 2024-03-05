import {createSlice} from "@reduxjs/toolkit";

const CategoriesSlice = createSlice({
	name: "categories",
	initialState: {
		value: {
			count: 0,
			next: null,
			previous: null,
			results: [],
		},
	},
	reducers: {
		set: (state, action) => {
			state.value = action.payload;
		},
		reset: (state) => {
			state.value = {
				count: 0,
				next: null,
				previous: null,
				results: [],
			};
		},
		
	},
});
export default CategoriesSlice.reducer;