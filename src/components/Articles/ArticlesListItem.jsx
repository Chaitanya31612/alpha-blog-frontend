import Gravatar from "react-gravatar";
import { Link } from "react-router-dom";
import { FeaturedIcon } from "../../assets/images";
import moment from "moment";
import { CategoryTags } from "../Categories";

const ArticlesListItem = ({ article }) => {
  console.log("article: ", article);
  return (
    <div className="row justify-content-md-center py-3">
      <div className="col-md-8">
        <div className="d-flex align-items-center justify-content-between">
          <Link
            to={`/users/${article.user?.id}`}
            className="user-entry gap-2 text-decoration-none"
          >
            <Gravatar
              email={article.user?.email}
              size={20}
              className="rounded-circle border"
            />
            <div className="flex-column flex-grow-1 justify-content-center gap-3">
              <span className="fw-semibold" style={{ fontSize: "14px" }}>
                {article.user?.username}
              </span>
            </div>
          </Link>
          <small className="text-muted d-flex gap-2">
            {article.featured && <FeaturedIcon />}
            {moment(article.created_at).format("MMM DD, YYYY")}
          </small>
        </div>

        <div className="" style={{ borderBottom: "1px solid #aaa" }}>
          <Link
            to={`/articles/${article.id}`}
            className="text-decoration-none text-dark py-1 d-block"
          >
            <h3 className="fw-bold fs-4">{article.title}</h3>
            <p className="">{article.description}</p>
          </Link>

          {article.categories?.length > 0 && (
            <small className="mb-4 d-block" id="tags">
              <CategoryTags tags={article.categories} />
            </small>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticlesListItem;
