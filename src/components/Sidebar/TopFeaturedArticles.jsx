import { useQuery } from "@tanstack/react-query";
import Gravatar from "react-gravatar";
import { Link } from "react-router-dom";
import { getFeaturedArticles } from "../../apis";

const TopFeaturedArticles = ({ setActiveTab }) => {
  const { isLoading, data: featuredArticles } = useQuery(
    ["topfeaturedArticles"],
    () => getFeaturedArticles({ limit: 3 }),
    {
      onSuccess: (data) => {
        console.log("featured: ", data);
      },
    }
  );

  return (
    <div className="py-5 pb-3 border-bottom">
      <p className="text-black fw-bold">
        Featured Articles
        <small>
          <span
            style={{ cursor: "pointer" }}
            onClick={() => setActiveTab(1)}
            className="text-success text-decoration-none badge"
          >
            See all
          </span>
        </small>
      </p>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {featuredArticles &&
            featuredArticles.length > 0 &&
            featuredArticles.slice(0, 3).map((article) => (
              <div key={article.id}>
                <Link
                  to={`/users/${article.user.id}`}
                  className="text-decoration-none text-muted d-flex align-items-center gap-2 mb-2"
                >
                  <Gravatar
                    email={article.user.email}
                    size={15}
                    style={{ borderRadius: "50%" }}
                  />
                  <div className="flex-column flex-grow-1 justify-content-center gap-1">
                    <span className="fw-normal" style={{ fontSize: "13px" }}>
                      {article.user.username}
                    </span>
                  </div>
                </Link>
                <Link
                  to={`/articles/${article.id}`}
                  className="text-decoration-none text-dark"
                >
                  <p className="fs-6 fw-semibold">{article.title}</p>
                </Link>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default TopFeaturedArticles;
