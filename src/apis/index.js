import axios from "axios";

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
    console.log("axios", axios.defaults.headers.common["Authorization"]);
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export const baseURL = import.meta.env.VITE_BASE_URL;

export * from "./articles";
export * from "./users";
