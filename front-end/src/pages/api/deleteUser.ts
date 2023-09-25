// api.js
import axios from "axios";

export async function deleteUser(id: any) {
  try {
    const response = await axios.delete(
      `https://the-alumnus-api.onrender.com/api/users/delete/${id}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Error fetching user data");
  }
}
