import {createSlice} from "@reduxjs/toolkit";

const HomeComponentSlice = createSlice({
	name: "homecomponents",
	initialState: {
		value: {
			components:[]
		},
	},
	reducers: {
		set: (state, action) => {
			state.value = action.payload;
			console.log(action.payload);
		},
		reset: (state) => {
			state.value = {
				components:[]
			};
		},
		
	},
});
export default HomeComponentSlice.reducer;