import ArticlesListItem from "./ArticlesListItem";

const ArticlesList = ({ articles }) => {
  return (
    <>
      {articles.map((article) => (
        <ArticlesListItem key={article.id} article={article} />
      ))}
    </>
  );
};

export default ArticlesList;
