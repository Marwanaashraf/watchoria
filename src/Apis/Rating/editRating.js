import axios from "axios";
import { supabaseKey, supabaseUrl } from "../../supabaseClient.js";

export const editRating = async (showId, rating, userId) => {
  try {
    const user = JSON.parse(localStorage.getItem("user_token"));
    if (!user) {
      return null;
    }
    const token = user.accessToken;
    const { data } = await axios.patch(
      `${supabaseUrl}/rest/v1/rating`,
      {
        rating_vote: rating,
      },
      {
        headers: {
          Prefer: "return=representation",
          "Content-Type": "application/json",
          Accept: "application/json",
          apikey: supabaseKey,
          Authorization: `Bearer ${token}`,
        },
        params: {
          show_id: `eq.${showId}`,
          user_id: `eq.${userId}`,
        },
      }
    );

    return data?.[0] || null;
  } catch (error) {
      return null;


  }
};
