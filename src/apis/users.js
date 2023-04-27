import axios from "axios";
import { baseURL } from ".";

export const loginUser = async ({ email, password }) => {
  try {
    const response = await axios.post(`${baseURL}/auth/login`, {
      email,
      password,
    });
    return response.data;
  } catch (err) {
    console.log("login err", err);
    throw Error(err.response.data.message);
  }
};

export const signUpUser = async ({ username, email, password }) => {
  try {
    const response = await axios.post(`${baseURL}/auth/signup`, {
      username,
      email,
      password,
    });
    return response.data;
  } catch (err) {
    console.log('sign up errr', err);
    throw Error(err.response.data.message);
  }
};

export const loadUser = async () => {
  try {
    const response = await axios.get(`${baseURL}/auth/me`);
    return response.data;
  } catch (err) {
    throw Error(err.response.data.message);
  }
};
