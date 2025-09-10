import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

async function getMovies(data) {
  const options = {
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NmUzYjlhMjkxYzQxOThlZDY3M2VjMTExNGUzNjFlNyIsIm5iZiI6MTc1MTQwOTc1OC43NDIsInN1YiI6IjY4NjQ2NDVlYTAzZmZmYzRjMmNjZGM1OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.P5hWPGE6zh0J59tmTpJpZQaUftGDxS38lH7fT94GrgI",
    },
  };

  let req = await axios
    .get(
      `https://api.themoviedb.org/3/movie/${data.type}?language=en-US&page=${data.page}`,
      options
    )
    .catch((err) => {
      console.error(err);
    });
  return req.data;
}
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
