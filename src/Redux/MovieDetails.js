import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { getMovieData } from "../Apis/Movies/getMovie.js";
export let getMovie = createAsyncThunk("movie/getMovieDetails", getMovieData);
export let MovieSlice = createSlice({
  name: "movie",
  initialState: {
    movie: {},
    loading: true,
    cast: [],
    recomindations: [],
    director: {},
    ageRating: {},
    streamList: [],
  },
  extraReducers: (builder) => {
    builder.addCase(getMovie.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getMovie.fulfilled, (state, action) => {
      const payload = action.payload || {};
      state.movie = payload.movie || {};
      state.cast = payload.cast || [];
      state.ageRating = payload.ageRating || {};
      state.recomindations = payload.recomindations || [];
      state.director = payload.director || {};
      state.streamList = payload.streamList || [];
      state.loading = false;
    });
    builder.addCase(getMovie.rejected, (state, action) => {
      state.loading = true;
    });
  },
});
export let movieDetailsReducer = MovieSlice.reducer;
