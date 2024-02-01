import { createSlice } from "@reduxjs/toolkit";

let initialState = { progress: "hide" };

const editPost = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openEdit(state) {
      state.progress = "show";
    },
    hideEdit(state) {
      state.progress = "hide";
    },
  },
});

export const { openEdit, hideEdit } = editPost.actions;
export default editPost.reducer;
