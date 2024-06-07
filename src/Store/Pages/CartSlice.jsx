import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "cart",
  initialState: {
    value: {
      products: [],
      quantity: 1,
      sub_total: 0,
      discounts: 0,
      total: 0,
      shipping: 0,
    },
  },
  reducers: {
    set: (state, action) => {
      state.value = action.payload;
    },
    reset: (state) => {
      state.value = {
        products: [],
        quantity: 1,
        sub_total: 0,
        discounts: 0,
        total: 0,
        shipping: 0,
      };
    },
    
    deleteItem: (state, action) => {
      // Correctly access state.value.products instead of state.products
      state.value.products = state.value.products.filter(
        (item) => item.cart_item_id !== action.payload
      );
    },
    // addItem: (state, action) => {
    //   //  state.items.push(action.payload)
    //   const itemToAdd = action.payload;
    //   const existingItem = state.products.find((item) => item.id === itemToAdd.id);

    //   if (existingItem) {
    //     state.quantity += 1;
    //   } else {
    //     state.products.push({ ...itemToAdd, quantity: 1 });
    //   }
    // },
    addItem: (state, action) => {
      const itemToAdd = action.payload;
      const existingItemIndex = state.value.products.findIndex((item) => item.id === itemToAdd.id);
    
      if (existingItemIndex !== -1) {
        // If the item already exists, update its quantity
        state.value.products[existingItemIndex].quantity += 1;
      } else {
        // If the item doesn't exist, add it to the products array
        state.value.products.push({ ...itemToAdd, quantity: 1 });
      }
    },
    putItem: (state, action) => {
      const index = state.value.results.findIndex(
        (item) => item.id === action.payload.id
      );
      state.value.results.splice(index, 1, action.payload.item);
    },
    patchItem: (state, action) => {
      const index = state.value.results.findIndex(
        (item) => item.id === action.payload.id
      );
      state.value.results.splice(index, 1, {
        ...state.value.results[index],
        ...action.payload.item,
      });
    },
  },
});
export default CartSlice.reducer;
