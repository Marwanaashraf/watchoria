import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { getMovies } from "../Apis/getMovies.js";
export let getAllMovies = createAsyncThunk("movies/getMovies", getMovies);
export let MovieSlice = createSlice({
  name: "movie",
  initialState: { movieList: [], loading: true, totalPages: 0, currentPage: 1 },
  reducers: {
    changeMoviePage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllMovies.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAllMovies.fulfilled, (state, action) => {
      state.movieList = action.payload.results;
      state.totalPages = action.payload.total_pages;
      state.currentPage = action.payload.page;
      state.loading = false;
    });
    builder.addCase(getAllMovies.rejected, (state, action) => {
      state.loading = true;
    });
  },
});
export let movieReducer = MovieSlice.reducer;
export let { changeMoviePage } = MovieSlice.actions;
