import axios from "axios";
import { options } from "../options.js";
export const getTrending = async () => {
  try {
    const [movieReq, tvReq] = await Promise.all([
      axios.get(
        `https://api.themoviedb.org/3/trending/movie/day?language=en-US`,
        options
      ),
      axios.get(
        `https://api.themoviedb.org/3/trending/tv/day?language=en-US`,
        options
      ),
    ]);
    return [movieReq, tvReq];
  } catch (error) {
    return null;
  }
};
