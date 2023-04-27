import { Navigate } from "react-router-dom";
import LoginForm from "../../components/Login/LoginForm";
import { useAuth } from "../../contexts/AuthContext";

const Login = () => {
  const { loggedIn } = useAuth();

  if (loggedIn) {
    return <Navigate replace to="/articles" />;
  }
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
