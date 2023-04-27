import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useCookies } from "react-cookie";
import { signUpUser } from "../../apis";

const SignUpForm = () => {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser, loggedIn, setLoggedIn } = useAuth();
  const [, setCookie] = useCookies(["authToken"]);
  const { isLoading, isError, error, data, mutateAsync } = useMutation(
    ["signup"],
    signUpUser
  );

  return (
    <Formik
      initialValues={{ email: "", password: "", username: "" }}
      validate={(values) => {
        const errors = {};
        if (!values.email) {
          errors.email = "Required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        }
        return errors;
      }}
      onSubmit={async ({ email, username, password }, { setSubmitting }) => {
        setSubmitting(false);
        console.log("Email: ", email);
        console.log("Username: ", username);
        console.log("password: ", password);
        console.log("currentUser: ", currentUser);
        console.log("loggedIn: ", loggedIn);

        const { token, user } = await mutateAsync({
          email,
          username,
          password,
        });
        console.log("res is: ", token, user);
        setLoggedIn(true);
        setCurrentUser(user);
        setCookie("authToken", token, { path: "/" });
        localStorage.setItem("authToken", token);
        setCookie("user", user, { path: "/" });
        navigate("/articles");
      }}
    >
      {({ isSubmitting }) => (
        <Form className="px-5">
          <div className="form-group row mb-2">
            <label
              htmlFor="username"
              className="col-form-label fw-semibold text-muted ps-0"
            >
              Username
            </label>
            <Field
              type="text"
              name="username"
              className="form-control"
              placeholder="username_123"
              required
            />
            <ErrorMessage name="username" component="div" />
          </div>
          <div className="form-group row mb-2">
            <label
              htmlFor="email"
              className="col-form-label fw-semibold text-muted ps-0"
            >
              Email
            </label>
            <Field
              type="email"
              name="email"
              className="form-control"
              placeholder="email@example.com"
              required
            />
            <ErrorMessage name="email" component="div" />
          </div>
          <div className="form-group row mb-2">
            <label
              htmlFor="password"
              className="col-form-label fw-semibold text-muted ps-0"
            >
              Password
            </label>
            <Field
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter your password"
              required
            />
            <ErrorMessage name="password" component="div" />
          </div>
          <div className="form-group row">
            <div className="form-group row">
              <button
                type="submit"
                className="btn btn-primary mt-4"
                style={{ width: "100%" }}
                disabled={isSubmitting}
              >
                Sign up
              </button>
            </div>
            <div className="form-group row mt-3">
              <small className="text-muted ps-0">
                <span>Already have an account? </span>
                <Link to="/login">Login</Link>
              </small>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SignUpForm;
