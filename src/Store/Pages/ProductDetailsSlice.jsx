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
			const productIdToUpdate = action.payload.id; // Assuming action.payload contains the ID of the product to favorite
		  
			// Find the index of the item in state.value array
			const index = state.value.findIndex((item) => item.id === productIdToUpdate);
		  
			if (index !== -1) {
			  // Create a new array to ensure immutability
			  const updatedValue = [...state.value];
			  
			  // Update the is_favorite property of the item
			  updatedValue[index] = {
				...updatedValue[index],
				is_favorite: !updatedValue[index].is_favorite,
			  };
		  
			  // Update the state with the new array
			  state.value = updatedValue;
			}
		  },
		  
		
	},
});
export default ProductDetailsSlice.reducer;