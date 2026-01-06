import { supabase } from "../../supabaseClient.js";

export const getUser = async (token) => {
  const user = await supabase.auth.getUser(token);

  if (user.error) {
    throw user.error;
  }
  return user.data.user;
};
