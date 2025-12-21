import axios from "axios";
import { supabaseKey, supabaseUrl } from "../../supabaseClient.js";
export const deleteWatchList = async (showId) => {
  try {
    const user = JSON.parse(localStorage.getItem("user_token"));
    const token = user.accessToken;
    if (!user) return null;
    const res = await axios.delete(`${supabaseUrl}/rest/v1/watchlist`, {
      headers: {
        apikey: supabaseKey,
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      params: {
        show_id: `eq.${showId}`,
      },
    });
    console.log(res);

    return res;
  } catch (error) {
    console.error(error);

    return null;
  }
};
