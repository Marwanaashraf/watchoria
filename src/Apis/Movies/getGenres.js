import axios from "axios";
import { options } from "../options.js";

export const getMoviesGenres = async () => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list`,
      options,
    );
    return data.genres;
  } catch (error) {
    console.error(error);
    return null;
  }
};
