import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { loadArticles } from "../../apis";
import { ArticlesList } from "../../components/Articles";
import { Tabs } from "../../components/Common";
import {
  TopCategories,
  TopFeaturedArticles,
  TopUsers,
} from "../../components/Sidebar";
import { useAuth } from "../../contexts/AuthContext";

const ArticlesPage = () => {
  const {
    isError,
    isLoading,
    error,
    data: articles,
  } = useQuery(["articles"], loadArticles, {
    onError: (error) => {
      console.log("Error: ", error);
    },
    onSuccess: (data) => {
      console.log("Success: ", data);
    },
  });
  const { currentUser } = useAuth();

  const [activeTab, setActiveTab] = useState(0);

  const articleTabs = [
    {
      name: "Your Feed",
      path: "/articles",
    },
    {
      name: "Featured",
      path: "/articles/featured",
    },
  ];

  return (
    <div className="section-profile">
      <div style={{ flexGrow: 3, order: -1 }}>
        <div className="container">
          <div className="search-page__tabs my-5 pb-2 border-bottom">
            <Tabs
              tabs={articleTabs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </div>

          {isLoading ? (
            <div>Loading...</div>
          ) : articles && articles.length > 0 ? (
            <ArticlesList articles={articles} />
          ) : (
            <p className="text-center">No Articles</p>
          )}
        </div>
      </div>

      {/* Side */}
      <div
        style={{ flexGrow: 1, justifyItems: "end" }}
        className="d-sm-none d-lg-block"
      >
        <div className="sticky-top" style={{ zIndex: 100 }}>
          <TopFeaturedArticles />

          <TopCategories />

          <TopUsers />
        </div>
      </div>
    </div>
  );
};

export default ArticlesPage;
