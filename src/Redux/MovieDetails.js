import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { getMovieData } from "../Apis/getMovie.js";
export let getMovie = createAsyncThunk("movie/getMovieDetails", getMovieData);
export let MovieSlice = createSlice({
  name: "movie",
  initialState: {
    movie: {},
    loading: true,
    cast: [],
    recomindations: [],
    director: "",
    trailer: {},
  },
  extraReducers: (builder) => {
    builder.addCase(getMovie.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getMovie.fulfilled, (state, action) => {
      state.movie = action.payload.movies;
      state.cast = action.payload.cast;
      state.recomindations = action.payload.recomindations;
      state.trailer = action.payload.trailer;
      state.director = action.payload.director;
      state.loading = false;
    });
    builder.addCase(getMovie.rejected, (state, action) => {
      state.loading = true;
    });
  },
});
export let movieDetailsReducer = MovieSlice.reducer;
