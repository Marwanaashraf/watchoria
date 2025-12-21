import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getWatchListData } from "../Apis/WatchList/getWatchList.js";
export const getWatchList = createAsyncThunk(
  "watchList/getWatchList",
  getWatchListData
);
const watchlistSlcie = createSlice({
  name: "watchlist",
  initialState: { watchList: [], watchListLoading: false },
  reducers: {
    setInWatchList: (state, action) => {
      state.watchList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getWatchList.pending, (state, action) => {
      state.watchListLoading = true;
    });
    builder.addCase(getWatchList.fulfilled, (state, action) => {
      state.watchList = action.payload;
      state.watchListLoading = false;
    });
    builder.addCase(getWatchList.rejected, (state, action) => {
      state.watchListLoading = true;
    });
  },
});
export const WatchlistReducer = watchlistSlcie.reducer;
export const { setInWatchList } = watchlistSlcie.actions;
