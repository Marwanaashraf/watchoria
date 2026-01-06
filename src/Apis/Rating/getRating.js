import axios from "axios";
import { supabaseKey, supabaseUrl } from "../../supabaseClient.js";

export const getRatingData = async (showId) => {
  try {
    const user = JSON.parse(localStorage.getItem("user_token"));
    if (!user) {
      return null;
    }
    const token = user.accessToken;
    const { data } = await axios.get(`${supabaseUrl}/rest/v1/rating`, {
      headers: {
        Accept: "application/json",
        apikey: supabaseKey,
        Authorization: `Bearer ${token}`,
      },
      params: {
        select: "*",
        show_id: `eq.${showId}`,
        limit: 1,
      },
    });
    return data[0];
  } catch (error) {
    return null;
  }
};
