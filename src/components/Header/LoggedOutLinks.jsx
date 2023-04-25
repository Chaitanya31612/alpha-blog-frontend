import { Link } from "react-router-dom";

const LoggedOutLinks = () => {
  return (
    <>
      <li className="nav-item">
        <Link to="/login" className="nav-link">
          Login
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/signup" className="nav-link">
          Sign Up
        </Link>
      </li>
    </>
  );
};

export default LoggedOutLinks;
