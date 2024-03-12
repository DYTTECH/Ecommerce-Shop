import {createSlice} from "@reduxjs/toolkit";

const FilterSlice = createSlice({
	name: "filter",
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
export default FilterSlice.reducer;