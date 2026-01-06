import axios from "axios";
import { ApiKey } from "../options.js";

export const getTvTrailer = async (tvId) => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/tv/${tvId}/videos?api_key=${ApiKey}`
    );
    return data.results.find(
      (ele) => ele.type === "Trailer" && ele.site === "YouTube"
    );
  } catch (error) {
    console.log(error);
    
    return null;
  }
};
