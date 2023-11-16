"use client";

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface listingState {
  title: string;
  category: string;
  location:string;
  description:string;
  price:number;
  guests:number;
  rooms:number;
  bathrooms:number,
  photo:any
}

const initialState: listingState = {
    title:"",
    category:"",
    location:"",
    description:"",
    price:0,
    guests:5,
    rooms:3,
    bathrooms:3,
    photo:{}
};

export const listingSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    category: (state, action: PayloadAction<string>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.category = action.payload;
    },
    location: (state,action: PayloadAction<string>) => {
      state.location = action.payload;
    },
    info:(state,action: PayloadAction<{rooms:number,bathrooms:number,guests:number}>) => {
      state.guests = action.payload.guests;
      state.rooms = action.payload.rooms;
      state.bathrooms = action.payload.bathrooms;
    },
    photo:(state,action: PayloadAction<any>) => {
      state.photo = action.payload
    },
    description:(state,action: PayloadAction<{title:string,description:string}>) => {
      state.title = action.payload.title
      state.description = action.payload.description
    },
    price:(state,action: PayloadAction<number>)=>{
      state.price = action.payload
    },
    empty:(state,action: PayloadAction)=>{
      state.title="",
    state.category="",
    state.location="",
    state.description="",
    state.price=0,
    state.guests=5,
    state.rooms=3,
    state.bathrooms=3,
    state.photo={}
    },
  },
});

// Action creators are generated for each case reducer function
export const { category, location,info ,photo , description,price,empty} = listingSlice.actions;

export default listingSlice.reducer;
