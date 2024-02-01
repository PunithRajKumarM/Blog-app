import { configureStore } from "@reduxjs/toolkit";
import editPostSlice from "./editPost";
const store = configureStore({
  reducer: {
    edit: editPostSlice,
  },
});

export default store;
