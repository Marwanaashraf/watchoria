import axios from "axios";
import { ApiKey, options } from "./options.js";

export async function getTvShowData(tvShowId) {

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