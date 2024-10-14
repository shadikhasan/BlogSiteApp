// src/utils/auth.ts
import axios from "axios";

export const refreshToken = async () => {
  const refreshToken = localStorage.getItem("refresh_token");

  if (refreshToken) {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/token/refresh/", {
        refresh: refreshToken,
      });

      // Save the new access token
      localStorage.setItem("access_token", response.data.access);

      return response.data.access;
    } catch (err) {
      console.error("Error refreshing token", err);
      // Handle refresh token expiration (e.g., log the user out)
    }
  }
};
