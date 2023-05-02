import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useCookies } from "react-cookie";
import { loginUser } from "../../apis";
import moment from "moment";

const LoginForm = () => {
  const navigate = useNavigate();
  const { currentUser, loggedIn, setLoggedIn } = useAuth();
  const [, setCookie] = useCookies(["authToken"]);
  const { mutateAsync } = useMutation(["login"], loginUser);

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={async ({ email, password }, { setSubmitting }) => {
        setSubmitting(false);
        console.log("Email: ", email);
        console.log("password: ", password);
        console.log("currentUser: ", currentUser);
        console.log("loggedIn: ", loggedIn);

        const { token, user } = await mutateAsync({
          email,
          password,
        });
        console.log("res is: ", token, user);
        setLoggedIn(true);
        // setCurrentUser(user);
        setCookie("authToken", token, {
          path: "/",
          maxAge: moment().add(1, "day").toDate(),
          secure: true,
          sameSite: "lax",
        });
        navigate("/articles", { replace: true });
      }}
    >
      {({ isSubmitting }) => (
        <Form className="px-5">
          <div className="form-group row mb-2">
            <label
              htmlFor="email"
              className="col-form-label fw-semibold text-muted ps-0"
            >
              Username or Email
            </label>
            <Field
              type="text"
              name="email"
              className="form-control"
              placeholder="Enter username or email"
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
            <button
              type="submit"
              className="btn btn-primary mt-4"
              style={{ width: "100%" }}
              disabled={isSubmitting}
            >
              Login
            </button>
          </div>
          <div className="form-group row mt-3">
            <small className="text-muted ps-0">
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              <span>Don't have an account? </span>
              <Link to="/signup">Sign Up</Link>
            </small>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
