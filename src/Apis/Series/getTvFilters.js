import axios from "axios";
import { ApiKey, options } from "../options.js";

export const getTvFilters = async (
  vote_average,
  sort_by,
  genres,
  release_year,
  page = 1,
) => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/tv`,
      {
        params: {
          api_key: ApiKey,
          with_genres: genres,
          primary_release_year: release_year,
          sort_by,
          "vote_average.gte": vote_average,
          page,
        },
      },
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};
