import { Link } from "react-router-dom";
import { ArticleForm } from "../../components/Articles";

const NewArticlePage = () => {
  return (
    <div className="container py-5" id="new_article">
      <div className="d-flex align-items-center justify-content-between">
        <h1 className="text-center">Create Article</h1>
        <Link to="/articles" className="btn btn-outline-danger">
          Cancel
        </Link>
      </div>
      <br />

      <ArticleForm />
    </div>
  );
};

export default NewArticlePage;
