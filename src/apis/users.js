import axios from "axios";
import { baseURL } from ".";

export const loadUsersList = async () => {
  try {
    if (axios.defaults.headers.common["Authorization"]) {
      const response = await axios.get(`${baseURL}/users`);
      return response.data;
    } else {
      throw Error("Unauthorized");
    }
  } catch (err) {
    throw Error(err.message);
  }
};

export const getTopUsers = async () => {
  try {
    if (axios.defaults.headers.common["Authorization"]) {
      const response = await axios.get(`${baseURL}/users/top`);
      return response.data;
    } else {
      throw Error("Unauthorized");
    }
  } catch (err) {
    throw Error(err.message);
  }
};

export const getUser = async (id) => {
  try {
    if (axios.defaults.headers.common["Authorization"]) {
      const response = await axios.get(`${baseURL}/users/${id}`);
      return response.data;
    } else {
      throw Error("Unauthorized");
    }
  } catch (err) {
    throw Error(err.message);
  }
};

export const followUser = async (id) => {
  try {
    if (axios.defaults.headers.common["Authorization"]) {
      const response = await axios.post(`${baseURL}/follow/${id}`);
      return response.data;
    } else {
      throw Error("Unauthorized");
    }
  } catch (err) {
    throw Error(err.message);
  }
};

export const unfollowUser = async (id) => {
  try {
    if (axios.defaults.headers.common["Authorization"]) {
      const response = await axios.post(`${baseURL}/unfollow/${id}`);
      return response.data;
    } else {
      throw Error("Unauthorized");
    }
  } catch (err) {
    throw Error(err.message);
  }
};
