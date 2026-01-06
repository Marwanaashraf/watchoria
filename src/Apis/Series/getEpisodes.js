import axios from "axios";
import { ApiKey } from "../options.js";
export async function getEpisodesData(id, season) {
  try {
    let req = await axios.get(
      `https://api.themoviedb.org/3/tv/${id}/season/${season}?api_key=${ApiKey}
  `
    );
    return req.data;
  } catch (error) {
    return null;
  }
}
