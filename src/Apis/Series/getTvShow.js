import axios from "axios";
import { ApiKey, options } from "../options.js";

export async function getTvShowData(tvShowId) {
  try {
    const [tvShowReq, castReq, recomindReq, ageReq, streamReq] =
      await Promise.all([
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
        axios.get(
          `https://api.themoviedb.org/3/tv/${tvShowId}/content_ratings?api_key=${ApiKey}`
        ),
        axios.get(
          `https://api.themoviedb.org/3/tv/${tvShowId}/watch/providers?api_key=${ApiKey}`
        ),
      ]);

    return {
      tvShow: tvShowReq.data,
      cast: castReq.data.cast.filter((ele) => ele.profile_path !== null),
      recomindations: recomindReq.data.results
        .filter((ele) => ele.vote_average !== 0 && ele.poster_path)
        .slice(0, 15),
      ageRating: ageReq.data.results.find((ele) => ele.iso_3166_1 === "US"),
      streamList: streamReq.data.results.EG?.flatrate,
    };
  } catch (error) {
    throw error;
  }
}
