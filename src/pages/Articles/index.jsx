import { useQuery } from "@tanstack/react-query";
import { loadArticles } from "../../apis";

const Articles = () => {
  const articles = useQuery(["articles"], loadArticles);
  console.log(articles);

  return <div>Articles</div>;
};

export default Articles;
