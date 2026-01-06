import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllRatings } from "../Apis/Rating/getAllRating.js";
export const getRatings = createAsyncThunk("rating/getRating", getAllRatings);
const RatingSlice = createSlice({
  name: "ratings",
  initialState: { ratingList: [], ratingLoading: true },
  reducers: {
    setRatingList: (state, action) => {
      state.ratingList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getRatings.pending, (state, action) => {
      state.ratingData = null;
      state.ratingLoading = true;
    });
    builder.addCase(getRatings.fulfilled, (state, action) => {
      state.ratingList = action.payload;
      state.ratingLoading = false;
    });
    builder.addCase(getRatings.rejected, (state, action) => {
      state.ratingData = null;
      state.ratingLoading = false;
    });
  },
});
export const RatingReducer = RatingSlice.reducer;
export const { setRatingList } = RatingSlice.actions;
