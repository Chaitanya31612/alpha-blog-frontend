import { useState } from "react";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login form submitted");
    console.log("Email: ", email);
  };

  return (
    <form className="px-5" onSubmit={handleLogin}>
      <div className="form-group row mb-2">
        <label
          htmlFor="email"
          className="col-form-label fw-semibold text-muted ps-0"
        >
          Username or Email
        </label>
        <input
          type="text"
          name="email"
          id="email"
          className="form-control"
          placeholder="Enter username or email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group row mb-2">
        <label
          htmlFor="password"
          className="col-form-label fw-semibold text-muted ps-0"
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className="form-control"
          placeholder="Enter your password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="form-group row">
        <button
          type="submit"
          className="btn btn-primary mt-4"
          style={{ width: "100%" }}
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
    </form>
  );
};

export default LoginForm;
