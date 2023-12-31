import axios from "axios";

export const getUsers = async (page, sortBy, sortOrder) => {
  try {
    const reqUrl = `${
      import.meta.env.VITE_BACKEND_URL
    }/api/user?page=${page}&sortBy=${sortBy}&sortOrder=${sortOrder}`;
    const response = await axios.get(reqUrl);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
