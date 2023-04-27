import axios from "axios";

export const loadArticles = async () => {
  try {
    const response = await axios.get("http://localhost:3000/articles");
    return response.data;
  } catch (err) {
    throw Error(err.message);
  }
};
