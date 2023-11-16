"use client";

import { createSlice } from "@reduxjs/toolkit";


export interface rentModalState {
  value: boolean;
}

const initialState: rentModalState = {
  value: false,
};

export const rentModalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openRentModal: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = true;
    },
    closeRentModal: (state) => {
      state.value = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { openRentModal, closeRentModal } = rentModalSlice.actions;

export default rentModalSlice.reducer;
