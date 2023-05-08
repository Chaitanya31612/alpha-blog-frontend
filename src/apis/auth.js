import axios from "axios";
import Swal from "sweetalert2";
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
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: err.response.data.message,
    });
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
    console.log("sign up errr", err);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: err.response.data.message[0],
    });
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

export const updateUser = async ({ id, username, email, password }) => {
  try {
    const response = await axios.put(`${baseURL}/users/${id}`, {
      username,
      email,
      password,
    });
    return response.data;
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: err.response.data.message,
    });
    throw Error(err.response.data.message);
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${baseURL}/users/${id}`);
    console.log("delete response", response);
    return response.data;
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: err.response.data.message,
    });
    throw Error(err.response.data.message);
  }
};
