import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getCategory } from "../../apis";
import { CategoryIcon } from "../../assets/images";
import { ArticlesList } from "../../components/Articles";
import CategoriesInfo from "../../components/Categories/CategoriesInfo";
import { TopCategories, TopUsers } from "../../components/Sidebar";

const CategoryPage = () => {
  const params = useParams();

  const { isError, isLoading, error, data } = useQuery(
    ["category"],
    () => getCategory(params.id),
    {
      onError: (error) => {
        console.log("Error: ", error);
      },
      onSuccess: (data) => {
        console.log("Success: ", data);
      },
    }
  );

  const { category, articles, usersCount } = data || {};

  return (
    <div className="section-profile">
      <div style={{ flexGrow: 3, order: -1 }}>
        <div className="d-flex gap-3 align-items-center justify-content-center mt-5 mb-4 border-bottom">
          <CategoryIcon />
          <p className="text-black fs-1 fw-semibold">{category?.name}</p>
        </div>
        <h3 className="mt-5 mb-4 text-center text-decoration-underline">
          Articles
        </h3>
        {isLoading ? (
          <div>Loading...</div>
        ) : articles && articles.length > 0 ? (
          <ArticlesList articles={articles} />
        ) : (
          <p className="text-center">No Articles</p>
        )}
      </div>

      <div
        style={{ flexGrow: 1, justifyItems: "end" }}
        className="d-sm-none d-lg-block"
      >
        <div className="sticky-top" style={{ zIndex: 100 }}>
          <br />
          <CategoriesInfo
            isLoading={isLoading}
            articlesCount={articles?.length}
            usersCount={usersCount}
          />

          <TopCategories />

          <TopUsers />
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
