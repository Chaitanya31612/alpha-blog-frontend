import { useCookies } from "react-cookie";
import Gravatar from "react-gravatar";
import { Link } from "react-router-dom";
import { WriteIcon, AdminIcon } from "../../assets/images";

const LoggedInLinks = ({ currentUser }) => {
  const [, , removeCookie] = useCookies(["authToken"]);

  const handleLogout = () => {
    removeCookie("authToken");
    window.location.href = "/";
  };

  return (
    <>
      <li className="nav-item">
        <Link
          to="/articles/new"
          className="nav-link d-flex align-items-center gap-1"
        >
          <WriteIcon />
          <span>Write</span>
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/users" className="nav-link">
          Users
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/articles" className="nav-link">
          Articles
        </Link>
      </li>
      {currentUser?.admin ? (
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#">
            Categories
          </a>
          <ul className="dropdown-menu">
            <li>
              <Link to="/categories" className="dropdown-item">
                Categories List
              </Link>
            </li>
            <li>
              <Link to="/categories/new" className="dropdown-item">
                Create category
              </Link>
            </li>
          </ul>
        </li>
      ) : (
        <li className="nav-item">
          <Link to="/categories" className="nav-link">
            Categories
          </Link>
        </li>
      )}
      <li className="nav-item">
        <Link to="/community" className="nav-link">
          Community
        </Link>
      </li>

      <li className="nav-item dropdown" style={{ zIndex: 9999 }}>
        <a
          className="nav-link dropdown-toggle d-flex align-items-center"
          href="#"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <Gravatar
            email={currentUser?.email}
            size={25}
            className="rounded-circle border me-1"
          />
          {currentUser?.username || "Chaitanya"}
          {currentUser?.admin && (
            <span className="ms-1">
              <AdminIcon />
            </span>
          )}
        </a>
        <ul className="dropdown-menu" style={{ margin: "0 -40px" }}>
          <li>
            <Link to={`/users/${currentUser?.id}`} className="dropdown-item">
              View Profile
            </Link>
          </li>
          <li>
            <Link
              to={`/users/${currentUser?.id}/edit`}
              className="dropdown-item"
            >
              Edit Profile
            </Link>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="dropdown-item"
              style={{ color: "red" }}
            >
              Logout
            </button>
          </li>
        </ul>
      </li>
    </>
  );
};

export default LoggedInLinks;
