import axios from "axios";
import { baseURL } from ".";

export const loadCategoriesList = async () => {
  try {
    if (axios.defaults.headers.common["Authorization"]) {
      const response = await axios.get(`${baseURL}/categories`);
      return response.data;
    } else {
      throw Error("Unauthorized");
    }
  } catch (err) {
    throw Error(err.message);
  }
};

export const getTopCategories = async () => {
  try {
    if (axios.defaults.headers.common["Authorization"]) {
      const response = await axios.get(`${baseURL}/categories/top`);
      return response.data;
    } else {
      throw Error("Unauthorized");
    }
  } catch (err) {
    throw Error(err.message);
  }
};
