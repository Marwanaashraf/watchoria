import axios from "axios";
import { supabaseKey, supabaseUrl } from "../../supabaseClient.js";

export const addWatchList = async (body) => {
  try {
    const user = JSON.parse(localStorage.getItem("user_token"));
    const token = user.accessToken;
    if (!user) return null;
    const res = await axios.post(`${supabaseUrl}/rest/v1/watchlist`, body, {
      headers: {
        apikey: supabaseKey,
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      params: {
        select: "*",
      },
    });
    console.log(res);

    return res;
  } catch (error) {
   return null
  }
};
