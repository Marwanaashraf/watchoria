import axios from "axios";
import { ApiKey } from "./options.js";
export async function getEpisodesData(id, season) {
  let req = await axios
    .get(
      `https://api.themoviedb.org/3/tv/${id}/season/${season}?api_key=${ApiKey}
`
    )
    .catch((err) => {
      console.log(err);
    });

  return req.data;
}
