import axios from "axios";
import { supabase } from "../../supabaseClient.js";

export const uploadAvatar = async (folderName, file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "client_uploads");
  formData.append("folder", folderName);
  try {
    const { data } = await axios.post(
      `https://api.cloudinary.com/v1_1/docgeaewu/image/upload`,
      formData
    );
    console.log(data);
    //update user
    const user = await supabase.auth.updateUser({
      data: {
        avatar_url: data.secure_url,
      },
    });
    return user.data.user;
  } catch (error) {
    return null;
  }
};
