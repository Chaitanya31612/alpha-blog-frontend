import moment from "moment";
import { Link } from "react-router-dom";
const CategoriesListItem = ({ category, color = "#f8f8f8" }) => {
  return (
    <div className="col-md-5">
      <div
        className="card border-5 text-center mb-5 bg-white rounded"
        id="article-card"
      >
        <div className="card-body d-flex justify-content-evenly align-items-center">
          <div
            className="fs-1"
            style={{
              backgroundColor: color,
              height: "100px",
              width: "100px",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {category?.name.toUpperCase().charAt(0)}
          </div>
          <div>
            <h5 className="card-title">
              <Link
                to={`/categories/${category.id}`}
                className="text-decoration-none text-dark"
              >
                {category.name}
              </Link>
            </h5>
            <div className="card-text py-2">
              <span className="text-muted fw-bolder fs-6">
                {category?.articlesCount}
              </span>
              <span
                className="text-muted text-uppercase"
                style={{ fontSize: "13px", letterSpacing: "1px" }}
              >
                {" "}
                Article{category?.articlesCount !== 1 && "s"}
              </span>
            </div>
            <div className="text-muted mb-3 d-flex flex-column gap-2">
              <small>
                <i>Created {moment(category?.created_at).fromNow()}</i>
              </small>
              <small>
                <i>Edited {moment(category?.updated_at).fromNow()}</i>
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesListItem;
