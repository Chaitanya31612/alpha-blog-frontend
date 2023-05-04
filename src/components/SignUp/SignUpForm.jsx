import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useCookies } from "react-cookie";
import { loadUser, signUpUser, updateUser } from "../../apis";
import moment from "moment";
import { useEffect } from "react";

const SignUpForm = ({ userDetails }) => {
  const params = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { currentUser, loggedIn, setLoggedIn, setCurrentUser } = useAuth();
  const [, setCookie] = useCookies(["authToken"]);

  const createUserMutation = useMutation(["signup"], signUpUser, {
    onSuccess: (data) => {
      console.log("Success: ", data);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const updateUserMutation = useMutation(["updateUser"], updateUser, {
    onSuccess: (data) => {
      console.log("Success: ", data);
      setCurrentUser(data.user);
      queryClient.invalidateQueries({ queryKey: ["user", params.id] });
    },
  });

  return (
    <Formik
      initialValues={{
        email: userDetails?.email ?? "",
        username: userDetails?.username ?? "",
        password: "",
      }}
      validate={(values) => {
        const errors = {};
        if (!values.username) {
          errors.username = "Required";
        } else if (values.username.length < 3) {
          errors.username = "Username must be at least 3 characters long";
        }

        if (!values.email) {
          errors.email = "Required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        }

        if (!values.password) {
          errors.password = "Required";
        } else if (values.password.length < 5) {
          errors.password = "Password must be at least 5 characters long";
        }
        return errors;
      }}
      onSubmit={async ({ email, username, password }, { setSubmitting }) => {
        setSubmitting(false);

        if (params.id) {
          const { message, user } = await updateUserMutation.mutateAsync({
            id: params.id,
            email,
            username,
            password,
          });
          console.log("res is: ", message, user);
          navigate(`/users/${params.id}`);
        } else {
          const { token, user } = await createUserMutation.mutateAsync({
            email,
            username,
            password,
          });

          console.log("res is: ", token, user);
          setLoggedIn(true);
          setCookie("authToken", token, {
            path: "/",
            maxAge: moment().add(1, "day").toDate(),
            secure: true,
            sameSite: "lax",
          });
          navigate(`/users/${user.id}`);
        }
      }}
    >
      {({ isSubmitting, setFieldValue }) => {
        useEffect(() => {
          if (userDetails) {
            console.log("userDetails: ", userDetails);
            setFieldValue("email", userDetails.email);
            setFieldValue("username", userDetails.username);
          }
        }, [userDetails]);

        return (
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
              <ErrorMessage
                className="text-danger small fst-italic px-0"
                name="username"
                component="div"
              />
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
              <ErrorMessage
                className="text-danger small fst-italic px-0"
                name="email"
                component="div"
              />
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
                placeholder={
                  params.id ? "Confirm your password" : "Enter your password"
                }
                required
              />
              <ErrorMessage
                className="text-danger small fst-italic px-0"
                name="password"
                component="div"
              />
            </div>
            <div className="form-group row">
              <button
                type="submit"
                className="btn btn-primary mt-4"
                style={{ width: "100%" }}
                disabled={isSubmitting}
              >
                {params.id ? "Update Profile" : "Sign Up"}
              </button>
            </div>
            <div className="form-group row">
              {!params.id && (
                <div className="form-group row mt-3">
                  <small className="text-muted ps-0">
                    <span>Already have an account? </span>
                    <Link to="/login">Login</Link>
                  </small>
                </div>
              )}
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default SignUpForm;
