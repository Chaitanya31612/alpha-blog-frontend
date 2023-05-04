import { useState } from "react";
import { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import SignUpForm from "../../components/SignUp/SignUpForm";
import { useAuth } from "../../contexts/AuthContext";

const EditUserPage = () => {
  const { currentUser } = useAuth();
  const params = useParams();

  if (currentUser && currentUser.id !== Number(params.id)) {
    return <Navigate to={`/users/${params.id}`} />;
  }

  return (
    <div
      className="container py-5 border my-5 rounded"
      style={{ width: "30%" }}
    >
      <h1 className="text-center">Edit Profile</h1>
      <br />
      <SignUpForm userDetails={currentUser} />
    </div>
  );
};

export default EditUserPage;
