import {createSlice} from "@reduxjs/toolkit";

const BrandsSlice = createSlice({
	name: "brands",
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
export default BrandsSlice.reducer;