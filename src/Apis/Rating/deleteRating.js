import axios from "axios";
import { supabaseKey, supabaseUrl } from "../../supabaseClient.js";

export const deleteRating = async (showId) => {
  try {
    const user = JSON.parse(localStorage.getItem("user_token"));
    if (!user) {
      return null;
    }
    const token = user.accessToken;
    const res = await axios.delete(`${supabaseUrl}/rest/v1/rating`, {
      headers: {
        Accept: "application/json",
        apikey: supabaseKey,
        Authorization: `Bearer ${token}`,
      },
      params: {
        show_id: `eq.${showId}`,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};
