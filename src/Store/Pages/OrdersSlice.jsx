import { createSlice } from "@reduxjs/toolkit";

const OrdersSlice = createSlice({
  name: "orders",
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
      state.results = action.payload;
    },
    setObject: (state, action) => {
      state.value = {
        ...state.value,
        ...action.payload,
      };
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
      //  state.items=state.items.filter((item)=>item.id!==action.payload)
      return {
        ...state,
        items: state.products.filter(
          (item) => item.cart_item_id !== action.payload
        ),
      };
    },
    addItem: (state, action) => {
			state.value.results = [action.payload, ...state.value.results];
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
export default OrdersSlice.reducer;
