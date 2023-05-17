import axios from "axios";
import Swal from "sweetalert2";
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
      Swal.fire({
        icon: "success",
        text: "Article created successfully!",
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
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
      Swal.fire({
        icon: "success",
        text: "Article updated successfully!",
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
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
      Swal.fire({
        icon: "success",
        text: "Article deleted successfully!",
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
      return response.data;
    } else {
      throw Error("Unauthorized");
    }
  } catch (err) {
    throw Error(err.message);
  }
};

export const clapArticle = async (id) => {
  try {
    if (axios.defaults.headers.common["Authorization"]) {
      const response = await axios.post(`${baseURL}/article/${id}/upvote`);
      return response.data;
    } else {
      throw Error("Unauthorized");
    }
  } catch (err) {
    throw Error(err.message);
  }
};
