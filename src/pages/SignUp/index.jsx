import SignUpForm from "../../components/SignUp/SignUpForm";

const SignUp = () => {
  return (
    <div
      className="container py-5 m-auto border my-5 rounded"
      style={{ width: "30%" }}
    >
      <h1 className="text-center">SignUp</h1>
      <br />
      <SignUpForm />
    </div>
  );
};

export default SignUp;
