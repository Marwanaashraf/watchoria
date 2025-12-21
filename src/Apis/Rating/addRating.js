import axios from "axios";
import { supabaseKey, supabaseUrl } from "../../supabaseClient.js";

export const addRating = async (show) => {
  try {
    const user = JSON.parse(localStorage.getItem("user_token"));
    if (!user) {
      return null;
    }
    const token = user.accessToken;
    const {data} = await axios.post(`${supabaseUrl}/rest/v1/rating`, show, {
      headers: {
        Accept: "application/json",
        apikey: supabaseKey,
        Authorization: `Bearer ${token}`,
        Prefer: "return=representation",
        "Content-Type": "application/json",
      }
    });
    return data?.[0] || null
  } catch (error) {
    console.log(error);
    return null;
  }
};
