import axios from "axios";

export const editMessageApi = async (formData: any, id: any) => {
  try {
    const response = await axios.put(
      `https://the-alumnus-api.onrender.com/api/user/update/${id}`, // Corrected URL
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
    throw new Error("Edit message failed");
  }
};
