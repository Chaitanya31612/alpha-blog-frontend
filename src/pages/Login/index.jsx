import axios from "axios";
import { useEffect } from "react";
import LoginForm from "../../components/Login/LoginForm";

const Login = () => {
  const fetchArticles = async () => {
    const res = await axios.get(import.meta.env.VITE_BASE_URL + "/articles");
    console.log(res);
  };
  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <div
      className="container py-5 m-auto border my-5 rounded"
      style={{ width: "30%" }}
    >
      <h1 className="text-center">Login</h1>
      <br />
      <LoginForm />
    </div>
  );
};

export default Login;
