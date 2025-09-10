import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSeries } from "../Apis/getSeries.js";


export let getTvShows = createAsyncThunk("series/getShows", getSeries);
let SeriesSlice = createSlice({
  name: "tvshows",
  initialState: {
    seriesList: [],
    loading: true,
    totalPages: 1,
    currentPage: 1,
    err: "",
  },
  reducers: {
    changeTvPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTvShows.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getTvShows.fulfilled, (state, action) => {
      state.seriesList = action.payload.results;
      state.totalPages = action.payload.total_pages;
      state.currentPage = action.payload.page;
      state.loading = false;
    });
    builder.addCase(getTvShows.rejected, (state, action) => {
      state.err = action.error;
      state.loading = true;
    });
  },
});
export let SeriesReducer = SeriesSlice.reducer;
export let { changeTvPage } = SeriesSlice.actions;
