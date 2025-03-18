import { createSlice } from "@reduxjs/toolkit";
import { User } from "./types/user";

const user = JSON.parse(localStorage.getItem("user") || "null") as User | null;

export const userSlice = createSlice({
  name: "user",
  initialState: { user },
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload as User | null;
      localStorage.setItem("user", JSON.stringify(payload));
    },
  },
});

export const { setUser } = userSlice.actions;
const userReducer = userSlice.reducer;
export { userReducer };
