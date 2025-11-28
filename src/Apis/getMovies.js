import axios from "axios";
import { options } from "./options.js";

export async function getMovies(data) {
  let req = await axios
    .get(
      `https://api.themoviedb.org/3/movie/${data.type}?language=en-US&page=${data.page}`,
      options
    )
    .catch((err) => {
      console.error(err);
    });
    console.log(req.data);
    
  return req.data;
}
