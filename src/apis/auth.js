import axios from "axios";
import Swal from "sweetalert2";
import { baseURL } from ".";

export const loginUser = async ({ email, password }) => {
  try {
    const response = await axios.post(`${baseURL}/auth/login`, {
      email,
      password,
    });
    Swal.fire({
      icon: "success",
      text: "Login successfully!",
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
  } catch (err) {
    console.log("login err", err);
    Swal.fire({
      icon: "error",
      text: err?.response?.data?.message || "Something went wrong!",
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
    Swal.fire({
      icon: "success",
      text: "Profile created successfully!",
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
  } catch (err) {
    console.log("sign up errr", err);
    Swal.fire({
      icon: "error",
      text: err?.response
        ? err.response.data.message[0]
        : "Something went wrong!",
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
    Swal.fire({
      icon: "success",
      text: "User updated successfully!",
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
  } catch (err) {
    Swal.fire({
      icon: "error",
      text: err?.response ? err.response.data.message : "Something went wrong!",
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
    throw Error(err.response.data.message);
  }
};

export const deleteUser = async ({ id, password }) => {
  try {
    const response = await axios.delete(`${baseURL}/users/${id}`, {
      data: {
        password,
      },
    });
    console.log("delete response", response);
    Swal.fire({
      icon: "success",
      text: "User deleted successfully!",
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
  } catch (err) {
    Swal.fire({
      icon: "error",
      text: err?.response ? err.response.data.message : "Something went wrong!",
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
    throw Error(err.response.data.message);
  }
};
