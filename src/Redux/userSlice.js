import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
let initialState = { userData: null };

let UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    handleToken: (state) => {
      let token = JSON.parse(localStorage.getItem("user_token"));
      let diffMin = (token?.expiredTime - Date.now()) / 1000 / 60;
      if (!token) {
        state.userData = null;
        return;
      }
      if (diffMin > 0) {
        const token_decode = jwtDecode(token.accessToken);
        state.userData = {
          email: token_decode?.email,
          userName: token_decode?.user_metadata?.userName,
        };
      } else {
        localStorage.removeItem("user_token");
        state.userData = null;
      }
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
});
export const UserReducer = UserSlice.reducer;
export const { handleToken } = UserSlice.actions;
export const { setUserData } = UserSlice.actions;
