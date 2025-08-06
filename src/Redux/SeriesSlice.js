import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

async function getSeries(data) {
  const options = {
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NmUzYjlhMjkxYzQxOThlZDY3M2VjMTExNGUzNjFlNyIsIm5iZiI6MTc1MTQwOTc1OC43NDIsInN1YiI6IjY4NjQ2NDVlYTAzZmZmYzRjMmNjZGM1OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.P5hWPGE6zh0J59tmTpJpZQaUftGDxS38lH7fT94GrgI",
    },
  };

  let req = await axios
    .get(
      `https://api.themoviedb.org/3/tv/${data.type}?language=en-US&page=${data.page}`,
      options
    )
    .catch((err) => {
      console.error(err);
    });
  return req.data;
}
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
      state.loading = false;
    });
  },
});
export let SeriesReducer = SeriesSlice.reducer;
export let { changeTvPage } = SeriesSlice.actions;
