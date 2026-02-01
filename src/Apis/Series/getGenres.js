import axios from "axios";
import { options } from "../options.js";

export const getTvGenres = async () => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/tv/list`,
      options,
    );
    return data.genres;
  } catch (error) {
    console.error(error);
    return null;
  }
};
