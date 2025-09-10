import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiKey } from "../assets/Default/Default.js";
async function getMovieData(movieId) {
  const options = {
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NmUzYjlhMjkxYzQxOThlZDY3M2VjMTExNGUzNjFlNyIsIm5iZiI6MTc1MTQwOTc1OC43NDIsInN1YiI6IjY4NjQ2NDVlYTAzZmZmYzRjMmNjZGM1OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.P5hWPGE6zh0J59tmTpJpZQaUftGDxS38lH7fT94GrgI",
    },
  };
  try {
    const [movieReq, castReq, recomendationReq] = await Promise.all([
      axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}&language=en-US`,
        options
      ),
      axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
        options
      ),
      axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${ApiKey}&language=en-US&page=1`,
        options
      ),
    ]);

    return {
      director: castReq.data.crew.find((ele) => ele.job === "Director").name,
      movies: movieReq.data,
      cast: castReq.data.cast.filter((ele) => ele.profile_path != null),
      recomindations: recomendationReq.data.results
        .filter((ele) => ele.vote_average != 0)
        .slice(0, 10),
    };
  } catch (err) {
    console.log(err);
  }
}

export let getMovie = createAsyncThunk("movie/getMovieDetails", getMovieData);
export let MovieSlice = createSlice({
  name: "movie",
  initialState: {
    movie: {},
    loading: true,
    cast: [],
    recomindations: [],
    director: "",
  },
  extraReducers: (builder) => {
    builder.addCase(getMovie.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getMovie.fulfilled, (state, action) => {
      state.movie = action.payload.movies;
      state.cast = action.payload.cast;
      state.recomindations = action.payload.recomindations;
      state.director = action.payload.director;
      state.loading = false;
    });
    builder.addCase(getMovie.rejected, (state, action) => {
      state.loading = true;
    });
  },
});
export let movieDetailsReducer = MovieSlice.reducer;
