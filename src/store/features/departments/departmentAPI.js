import axios from "axios";

export const getDepartments = async () => {
  try {
    const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/api/departments`;
    const response = await axios.get(reqUrl);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const addDepartment = async (data) => {
  try {
    const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/api/departments`;
    const response = await axios.post(reqUrl, data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const editDepartment = async (id, data) => {
  try {
    const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/api/departments/${id}`;
    const response = await axios.put(reqUrl, data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const deleteDepartment = async (id) => {
  try {
    const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/api/departments/${id}`;
    const response = await axios.delete(reqUrl);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
