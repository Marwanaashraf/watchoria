import axios from "axios";
import { ApiKey } from "./options.js";

export async function getSearch(value) {
  let req = await axios
    .get(
      `https://api.themoviedb.org/3/search/multi?api_key=${ApiKey}&query=${value}`
    )
    .catch((err) => {
      console.log(err);
    });
  return req.data;
}
