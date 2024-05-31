import { createSlice } from "@reduxjs/toolkit";

const AddressSlice = createSlice({
  name: "address",
  initialState: {
    value: [],
  },
  reducers: {
    set: (state, action) => {
      state.value = action.payload;
    },
    reset: (state) => {
      state.value =  []
    },
    deleteItem: (state, action) => {
      if (state.value) {
        state.value = state.value.filter(
          (item) => item.id !== action.payload.id
        );
        
      }
    },
    addItem: (state, action) => {
      if (state.value) {
        state.value = [action.payload, ...state.value];
      }
    },
    putItem: (state, action) => {
      if (state.value) {
        const index = state.value.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.value[index] = action.payload.item;
        }
      }
    },
    patchItem: (state, action) => {
      console.log(state.value,action.payload);
      if (state.value) {
        const index = state.value.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.value[index] = {
            ...state.value[index],
            ...action.payload.item,
          };
        }
      }
    },

  },
});

export default AddressSlice.reducer;
