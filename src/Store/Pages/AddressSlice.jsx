import { createSlice } from "@reduxjs/toolkit";

const AddressSlice = createSlice({
  name: "address",
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
    deleteItem: (state, action) => {
      if (state.value.results) {
        state.value.results = state.value.results.filter(
          (item) => item.id !== action.payload.id
        );
        state.value.count -= 1;
      }
    },
    addItem: (state, action) => {
      if (state.value.results) {
        state.value.results = [action.payload, ...state.value.results];
        state.value.count += 1;
      }
    },
    putItem: (state, action) => {
      if (state.value.results) {
        const index = state.value.results.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.value.results[index] = action.payload.item;
        }
      }
    },
    patchItem: (state, action) => {
      if (state.value.results) {
        const index = state.value.results.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.value.results[index] = {
            ...state.value.results[index],
            ...action.payload.item,
          };
        }
      }
    },
    favoriteItem: (state, action) => {
      if (state.value.results) {
        const index = state.value.results.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.value.results[index] = {
            ...state.value.results[index],
            is_favorite: !state.value.results[index].is_favorite,
          };
        }
      }
    },
  },
});

export default AddressSlice.reducer;
