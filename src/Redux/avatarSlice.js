import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUser } from "../Apis/profile/getUser.js";
export const getAvatar = createAsyncThunk("avatar/getUser", getUser);
const AvatarSlice = createSlice({
  name: "avatar",
  initialState: { userAvatar: null, isLoading: true },
  reducers: {
    setUserAvatar: (state, action) => {
      state.userAvatar = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAvatar.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getAvatar.fulfilled, (state, action) => {
      state.userAvatar = action.payload.user_metadata.avatar_url;
      state.isLoading = false;
    });
    builder.addCase(getAvatar.rejected, (state, action) => {
      state.userAvatar = null;
      state.isLoading = false;
    });
  },
});
export const AvatarReducer = AvatarSlice.reducer;
export const { setUserAvatar } = AvatarSlice.actions;
