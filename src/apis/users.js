import { api } from ".";

export const loginUser = async () => {
  try {
    const response = await api.get("/login");
    return response.data;
  } catch (err) {
    throw Error(err.response.data.message);
  }
};

export const signUpUser = async () => {
  try {
    const response = await api.get("/signup");
    return response.data;
  } catch (err) {
    throw Error(err.response.data.message);
  }
};
