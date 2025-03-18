import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./userSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;

export type InitialState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;
