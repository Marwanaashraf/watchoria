import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRatingData } from "../Apis/Rating/getRating.js";
export const getRating = createAsyncThunk("rating/getRating", getRatingData);
const RatingSlice = createSlice({
  name: "rating",
  initialState: { ratingData: {}, ratingLoading: true },
  reducers: {
    setRatingData: (state, action) => {
      state.ratingData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getRating.pending, (state, action) => {
      state.ratingLoading = true;
    });
    builder.addCase(getRating.fulfilled, (state, action) => {
      state.ratingData = action.payload;
      state.ratingLoading = false;
    });
    builder.addCase(getRating.rejected, (state, action) => {
      state.ratingLoading = false;
    });
  },
});
export const RatingReducer = RatingSlice.reducer;
export const { setRatingData } = RatingSlice.actions;
