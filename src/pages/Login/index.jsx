import LoginForm from "../../components/Login/LoginForm";

const Login = () => {
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
