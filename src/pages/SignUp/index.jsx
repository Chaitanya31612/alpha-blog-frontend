import { useState } from "react";
import { Navigate } from "react-router-dom";
import SignUpForm from "../../components/SignUp/SignUpForm";
import { useAuth } from "../../contexts/AuthContext";

const SignUp = () => {
  const { loggedIn } = useAuth();

  if (loggedIn) {
    return <Navigate replace to="/articles" />;
  }

  return (
    <div
      className="container py-5 border my-5 rounded"
      style={{ width: "30%" }}
    >
      <h1 className="text-center">SignUp</h1>
      <br />
      <SignUpForm />
    </div>
  );
};

export default SignUp;
