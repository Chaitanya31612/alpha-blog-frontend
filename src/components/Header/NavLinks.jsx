import LoggedInLinks from "./LoggedInLinks";
import LoggedOutLinks from "./LoggedOutLinks";

const NavLinks = ({ loggedIn, setLoggedIn, currentUser }) => {
  return (
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        {loggedIn ? (
          <LoggedInLinks currentUser={currentUser} />
        ) : (
          <LoggedOutLinks />
        )}
      </ul>
    </div>
  );
};

export default NavLinks;
