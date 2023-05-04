import { useMutation, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import Gravatar from "react-gravatar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { clapArticle, deleteArticle } from "../../apis";
import { useAuth } from "../../contexts/AuthContext";
import { CategoryTags } from "../Categories";

const ArticleDetails = ({ article }) => {
  const params = useParams();
  const { currentUser } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const deleteArticleMutation = useMutation(["deleteArticle"], deleteArticle, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["article", params.id],
      });
    },
  });

  const clapArticleMutation = useMutation(["clapArticle"], clapArticle, {
    onSuccess: (data) => {
      console.log("clapArticleMutatio", data);
      queryClient.invalidateQueries({
        queryKey: ["article", params.id],
      });
    },
  });

  const handleDelete = async (e) => {
    e.preventDefault();

    if (window.confirm("Are you sure you want to delete this article?")) {
      deleteArticleMutation.mutate(params.id);
      navigate("/articles");
    }
  };

  const handleClaps = async () => {
    clapArticleMutation.mutate(params.id);
  };

  return (
    <div className="container py-4">
      {article.categories && article.categories.length > 0 && (
        <div className="my-4 text-center d-block" id="tags">
          <b>Tags: &nbsp;</b> <CategoryTags tags={article.categories} />
        </div>
      )}

      <div className="m-md-auto p-3 p-4 py-5 w-75" id="article_display">
        <small className="d-flex justify-content-between mb-lg-4">
          <Link
            to={`/users/${article.user?.id}`}
            className="text-decoration-none d-flex align-items-stretch justify-content-center gap-3 text-dark"
          >
            <div className="text-muted d-flex align-items-center">
              <Gravatar
                email={article.user?.email}
                size={40}
                className="rounded-circle border"
              />
            </div>
            <div className="d-flex flex-column justify-content-center gap-1">
              <span className="fw-bold fs-6">{article.user?.username}</span>
              <span className="text-muted">
                {moment(article.created_at).format("MMM DD, YYYY")}
              </span>
            </div>
          </Link>
          <i className="text-muted align-self-end">
            Updated {moment(article.updated_at).fromNow()}{" "}
          </i>
        </small>
        <hr />
        <div className="mt-4">
          <h5 className="text-capitalize fw-bold fs-3 mb-4">{article.title}</h5>
          <p>{article.description}</p>
          <br />

          <div id="votes">
            {article.user.id == currentUser.id ? (
              <span className="text-warning user-select-none">
                &#128079; {article.upvotes} Clap{article.upvotes != 1 && "s"}
              </span>
            ) : (
              <span
                className="text-warning user-select-none"
                style={{ cursor: "pointer" }}
                onClick={handleClaps}
              >
                &#128079; {article.upvotes} Clap{article.upvotes != 1 && "s"}
              </span>
            )}
          </div>

          {article.user.id === currentUser.id && (
            <div className="mt-4">
              <Link
                to={`/articles/${article.id}/edit`}
                className="btn btn-outline-primary"
              >
                Edit
              </Link>
              <button
                className="btn btn-outline-danger ms-2"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticleDetails;
