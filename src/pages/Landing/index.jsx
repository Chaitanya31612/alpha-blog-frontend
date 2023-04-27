import { Link, Navigate } from "react-router-dom";
import Footer from "../../components/Common/Footer";
import { useAuth } from "../../contexts/AuthContext";
import { landingGridData } from "../../data/landingGridData";

const Landing = () => {
  const { loggedIn } = useAuth();

  if (loggedIn) {
    return <Navigate replace to="/articles" />;
  }

  return (
    <main role="main">
      <div className="p-5 pb-4 mb-4 bg-light" id="home-section">
        <div className="container-fluid py-5 text-center">
          <h1 className="display-5 fw-bold">Alpha Blog</h1>
          <p className="col-md-8 fs-4 w-100">
            Alpha Blog is a blogging application built using Ruby on Rails and
            is built for learning purposes.
          </p>
          <br />
          <Link to="/signup" className="btn btn-primary btn-lg">
            Sign Up
          </Link>
        </div>
      </div>

      <br />

      <div className="container">
        <div className="row pb-sm-5">
          {landingGridData.map(({ title, description }) => (
            <div className="col-md-4 px-md-5" key={title.substring(2)}>
              <p className="badge rounded-pill bg-success text-decoration-none text-white me-1">
                {`/${title.toLowerCase()}`}
              </p>
              <h3>{title}</h3>
              <p style={{ textAlign: "justify" }}>{description}</p>
            </div>
          ))}
        </div>
      </div>

      <br />
      <Footer />
    </main>
  );
};

export default Landing;
