import axios from "axios";

export const signUpApi = async (formData: any) => {
  try {
    const response = await axios.post(
      "https://the-alumnus-api.onrender.com/api/register",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `${token}`, // Include the token in the request header
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("signup failed");
  }
};
