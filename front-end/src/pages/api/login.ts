import axios from "axios";
import Cookies from "js-cookie";

export const loginApi = async (formData: any) => {
  try {
    const response = await axios.post(
      "https://the-alumnus-api.onrender.com/api/login",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `${token}`, // Include the token in the request header
        },
      }
    );

    // Assuming the response contains an 'id' field
    const { alumni_id } = response.data;
    // Save the 'id' in a cookie
    Cookies.set("userId", alumni_id, { expires: 2 }); // Set the cookie to expire in 7 days

    return response.data;
  } catch (error) {
    throw new Error("Login failed");
  }
};
