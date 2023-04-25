import { api } from ".";

export const loadArticles = async () => {
  try {
    const response = await api.get("/articles");
    return response.data;
  } catch (err) {
    throw Error(err.response.data.message);
  }
};
