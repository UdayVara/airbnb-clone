"use client"

import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./features/modalFeature"
import listingReducer from "./features/listingFeature"
import loginReducer from "./features/loginFeature"
import rentModalReducer from "./features/rentModalFeature"

export const store = configureStore({
  reducer: {
    modal:modalReducer,
    login:loginReducer,
    rentModal:rentModalReducer,
    listing:listingReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
