import { createSlice } from "@reduxjs/toolkit";
import StorageManager from "../utils/StorageManager";

const initialState = {
  count: StorageManager.getCount(),
  items: StorageManager.getItems(),
  total: StorageManager.getTotal(),
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, payload) => {
      let item = payload.payload;
      state.count += 1;
      state.items.push(item);
      StorageManager.addItem(item);
      StorageManager.calculateTotal();
      let total = 0;
      for (let item of state.items) total += item.price * item.quantity;
      state.total = total;
    },
    removeItem: (state, action) => {
      state.count -= 1;
      let filtered = state.items.filter((itm) => itm.id !== action.payload);
      state.items = filtered;
      StorageManager.removeItem(action.payload);
      StorageManager.calculateTotal();
      let total = 0;
      for (let item of filtered) total += item.price * item.quantity;
      state.total = total;
    },
    clearItems: (state) => {
      state.count = 0;
      state.items = [];
      state.total = 0;
      StorageManager.calculateTotal();
      StorageManager.clearItems();
    },
    editQuantity: (state, payload) => {
      payload = payload.payload;
      let id = payload.id;
      let quantity = payload.quantity;
      state.items[StorageManager.getIndexById(id)].quantity = quantity;
      StorageManager.editQuantity(id, quantity);
      StorageManager.calculateTotal();
      let total = 0;
      for (let item of state.items) total += item.price * item.quantity;
      state.total = total;
    },
  },
});

export const { addItem, removeItem, clearItems, editQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
