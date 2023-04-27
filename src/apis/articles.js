import axios from "axios";
import { baseURL } from ".";

export const loadArticles = async () => {
  try {
    if (axios.defaults.headers.common["Authorization"]) {
      const response = await axios.get(`${baseURL}/articles`);
      return response.data;
    } else {
      throw Error("Unauthorized");
    }
  } catch (err) {
    throw Error(err.message);
  }
};
