import axios from "axios";
import { ApiKey, options } from "./options.js";

export async function getMovieData(movieId) {
  try {
    const [movieReq, castReq, recomendationReq, trailerReq] = await Promise.all(
      [
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
          `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${ApiKey}`
        ),
      ]
    );

    return {
      director: castReq.data.crew.find((ele) => ele.job === "Director").name,
      movies: movieReq.data,
      cast: castReq.data.cast.filter((ele) => ele.profile_path !== null),
      recomindations: recomendationReq.data.results
        .filter((ele) => ele.vote_average !== 0 && ele.poster_path)
        .slice(0, 10),
      trailer: trailerReq.data.results.find(
        (ele) => ele.type === "Trailer" && ele.site === "YouTube"
      ),
    };
  } catch (err) {
    console.log(err);
  }
}
