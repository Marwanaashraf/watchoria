import axios from "axios";
import { ApiKey } from "../options.js";

export const getTrailer = async (movieId) => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${ApiKey}`
    );
    return data.results.find(
      (ele) => ele.type === "Trailer" && ele.site === "YouTube"
    );
  } catch (error) {
    return null;
  }
};
