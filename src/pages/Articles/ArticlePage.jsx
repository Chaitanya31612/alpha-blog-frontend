import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getArticle } from "../../apis";
import { ArticleDetails } from "../../components/Articles";
import { CategoryTags } from "../../components/Categories";
import { UserProfile } from "../../components/Users";

const ArticlePage = () => {
  const params = useParams();

  const {
    isError,
    isLoading,
    error,
    data: article,
  } = useQuery(["article", params.id], () => getArticle(params.id), {
    onError: (error) => {
      console.log("Error: ", error);
    },
    onSuccess: (data) => {
      console.log("article: ", data);
    },
  });

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="section-profile">
      <div style={{ flexGrow: 5, order: -1 }}>
        <ArticleDetails article={article} />
      </div>

      <div
        style={{ flexGrow: 1, justifyItems: "end" }}
        className="d-sm-none d-lg-block"
      >
        <div className="sticky-top" style={{ zIndex: 100 }}>
          <UserProfile userId={article?.user.id} />
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;
