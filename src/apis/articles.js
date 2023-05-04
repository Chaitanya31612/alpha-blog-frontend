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

export const getFeaturedArticles = async ({ limit }) => {
  try {
    if (axios.defaults.headers.common["Authorization"]) {
      const response = await axios.get(
        `${baseURL}/articles/featured?limit=${limit}`
      );
      return response.data;
    } else {
      throw Error("Unauthorized");
    }
  } catch (err) {
    throw Error(err.message);
  }
};

export const getArticle = async (id) => {
  try {
    if (axios.defaults.headers.common["Authorization"]) {
      const response = await axios.get(`${baseURL}/articles/${id}`);
      return response.data;
    } else {
      throw Error("Unauthorized");
    }
  } catch (err) {
    throw Error(err.message);
  }
};

export const createArticle = async ({
  title = "",
  description = "",
  category_ids = [],
}) => {
  try {
    if (axios.defaults.headers.common["Authorization"]) {
      const response = await axios.post(`${baseURL}/articles`, {
        title,
        description,
        category_ids,
      });
      return response.data;
    } else {
      throw Error("Unauthorized");
    }
  } catch (err) {
    throw Error(err.message);
  }
};

export const updateArticle = async ({
  id,
  title = "",
  description = "",
  category_ids = [],
}) => {
  try {
    if (axios.defaults.headers.common["Authorization"]) {
      const response = await axios.put(`${baseURL}/articles/${id}`, {
        title,
        description,
        category_ids,
      });
      return response.data;
    } else {
      throw Error("Unauthorized");
    }
  } catch (err) {
    throw Error(err.message);
  }
};

export const deleteArticle = async (id) => {
  try {
    if (axios.defaults.headers.common["Authorization"]) {
      const response = await axios.delete(`${baseURL}/articles/${id}`);
      return response.data;
    } else {
      throw Error("Unauthorized");
    }
  } catch (err) {
    throw Error(err.message);
  }
};
