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
		favoriteItem: (state, action) => {
			console.log(action.payload);
            const index = state.value.results.findIndex((item) => item.id === action.payload.id);
            state.value.results[index] = {
                ...state.value.results[index],
				 is_favorite: !state.value.results[index].is_favorite,
            };
		}
	},
});
export default RecommendationSlice.reducer;