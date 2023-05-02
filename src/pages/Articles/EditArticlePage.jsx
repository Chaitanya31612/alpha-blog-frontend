import { useQuery } from "@tanstack/react-query";
import { Link, Navigate, useParams } from "react-router-dom";
import { getArticle } from "../../apis";
import { ArticleForm } from "../../components/Articles";
import { useAuth } from "../../contexts/AuthContext";

const EditArticlePage = () => {
  const params = useParams();
  const { currentUser } = useAuth();

  const {
    isError,
    isLoading,
    error,
    data: article,
  } = useQuery(["edit", "article", params.id], () => getArticle(params.id), {
    onError: (error) => {
      console.log("Error: ", error);
    },
    onSuccess: (data) => {
      console.log("edit article: ", data);
    },
  });

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error: {error.message}</div>;

  if (article.user.id !== currentUser.id) {
    return <Navigate to={`/articles/${params.id}`} />;
  }

  return (
    <div className="container py-5" id="new_article">
      <div className="d-flex align-items-center justify-content-between">
        <h1 className="text-center">Create Article</h1>
        <Link to="/articles" className="btn btn-outline-danger">
          Cancel
        </Link>
      </div>
      <br />

      <ArticleForm articleDetails={article} />
    </div>
  );
};

export default EditArticlePage;
