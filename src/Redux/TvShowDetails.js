import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiKey } from "../assets/Default/Default.js";
async function getTvShowData(tvShowId) {
  const options = {
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NmUzYjlhMjkxYzQxOThlZDY3M2VjMTExNGUzNjFlNyIsIm5iZiI6MTc1MTQwOTc1OC43NDIsInN1YiI6IjY4NjQ2NDVlYTAzZmZmYzRjMmNjZGM1OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.P5hWPGE6zh0J59tmTpJpZQaUftGDxS38lH7fT94GrgI",
    },
  };
  try {
    let [tvShowReq, castReq, recomindReq] = await Promise.all([
      axios.get(
        `https://api.themoviedb.org/3/tv/${tvShowId}?api_key=${ApiKey}&language=en-US`,
        options
      ),
      axios.get(
        `https://api.themoviedb.org/3/tv/${tvShowId}/credits?api_key=${ApiKey}&language=en-US`,
        options
      ),
      axios.get(
        `https://api.themoviedb.org/3/tv/${tvShowId}/recommendations?api_key=${ApiKey}&language=en-US`,
        options
      ),
    ]);

    return {
      tvShow: tvShowReq.data,
      cast: castReq.data.cast.filter((ele) => ele.profile_path != null),
      recomindations: recomindReq.data.results.filter((ele) => ele.vote_average != 0 && ele.poster_path).slice(0, 10),
    };
  } catch (error) {
    console.log(error);
  }
}
export let getTvShow = createAsyncThunk(
  "tvShow/getTvShowDetails",
  getTvShowData
);
export let tvShowSlice = createSlice({
  name: "tvShow",
  initialState: { tvShow: {}, loading: true, cast: [], recomindations: [] },
  extraReducers: (builder) => {
    builder.addCase(getTvShow.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getTvShow.fulfilled, (state, action) => {
      state.tvShow = action.payload.tvShow;
      state.cast = action.payload.cast;
      state.recomindations = action.payload.recomindations;
      state.loading = false;
    });
    builder.addCase(getTvShow.rejected, (state, action) => {
      state.loading = true;
    });
  },
});
export let tvShowDetailsReducer = tvShowSlice.reducer;
