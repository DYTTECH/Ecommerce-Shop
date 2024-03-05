import {createSlice} from "@reduxjs/toolkit";

const RecommendationSlice = createSlice({
	name: "recommendation",
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
export default RecommendationSlice.reducer;