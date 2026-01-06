import axios from "axios";
import { ApiKey } from "../options.js";

export async function getSearch(value, page = 1) {
  try {
    const req = await axios
      .get(
        `https://api.themoviedb.org/3/search/multi?api_key=${ApiKey}&query=${value}&page=${page}`
      )
      .catch((err) => {
        console.log(err);
      });
    return req.data;
  } catch (error) {
    throw error;
  }
}
