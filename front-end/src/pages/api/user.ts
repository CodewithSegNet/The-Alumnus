// api.js
import axios from "axios";

export async function getUserData(id: any) {
  try {
    const response = await axios.get(
      `https://the-alumnus-api.onrender.com/api/users/${id}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Error fetching user data");
  }
}
