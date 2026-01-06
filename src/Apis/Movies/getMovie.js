import axios from "axios";
import { ApiKey, options } from "../options.js";
import { isRejectedWithValue } from "@reduxjs/toolkit";

export async function getMovieData(movieId) {
  try {
    const [movieReq, castReq, recomendationReq, ageReq, streamReq] =
      await Promise.all([
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
        axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/release_dates?api_key=${ApiKey}`
        ),
        axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/watch/providers?api_key=${ApiKey}`
        ),
      ]);

    return {
      director: castReq.data.crew.find((ele) => ele.job === "Director"),
      movie: movieReq.data,
      cast: castReq.data.cast.filter((ele) => ele.profile_path !== null),
      recomindations: recomendationReq.data.results
        .filter((ele) => ele.vote_average !== 0 && ele.poster_path)
        .slice(0, 15),
      ageRating: ageReq.data.results.find((ele) => ele.iso_3166_1 === "US")
        ?.release_dates[0],
      streamList: streamReq.data.results.EG?.flatrate,
    };
  } catch (error) {
    throw error;
  }
}
