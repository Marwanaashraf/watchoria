import axios from "axios";
import { supabaseKey, supabaseUrl } from "../../supabaseClient.js";

export const getWatchListData = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user_token"));
    if (!user) {
      return null;
    }
    const token = user.accessToken;
    const { data } = await axios.get(`${supabaseUrl}/rest/v1/watchlist`, {
      headers: {
        apikey: supabaseKey,
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      params: {
        select: "*",
      },
    });

    return data;
  } catch (error) {
    throw error;
  }
};
