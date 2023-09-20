import axios from "axios";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODYzZWY2Y2UyMmUzYmFkMGZkZjkyYyIsImVtYWlsIjoiamFtZXNAZ21haWwuY29tIiwiaWF0IjoxNjg2NTI2NDkwLCJleHAiOjE2ODY1MzAwOTB9.UDF3g5QMgFbd9-csT1AbQ7Hn7qiLATf06DTM-jPZBnA";
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
    return response.data;
  } catch (error) {
    throw new Error("Login failed");
  }
};
