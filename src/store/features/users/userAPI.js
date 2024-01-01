import axios from "axios";
import toast from "react-hot-toast";

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

export const addUser = async (data) => {
  try {
    const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/api/user`;
    const response = await axios.post(reqUrl, data);
    return response;
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.error);
  }
};

export const editUser = async (id, data) => {
  try {
    const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/api/user/${id}`;
    const response = await axios.put(reqUrl, data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (id) => {
  try {
    const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/api/user/${id}`;
    const response = await axios.delete(reqUrl);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
