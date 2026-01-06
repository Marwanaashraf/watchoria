import axios from "axios";
import { options } from "../options.js";

export async function getSeries(data) {
  try {
    const req = await axios.get(
      `https://api.themoviedb.org/3/tv/${data.type}?language=en-US&page=${data.page}`,
      options
    );

    return req.data;
  } catch (error) {
    throw error;
  }
}
