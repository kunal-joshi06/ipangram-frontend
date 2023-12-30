import axios from "axios";

export const loginUser = async (data) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
      data
    );
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getProfile = async (token) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };
    const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/api/auth/profile`;
    const response = await axios.get(reqUrl, config);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
