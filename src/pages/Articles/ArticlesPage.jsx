import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getFeaturedArticles, loadArticles } from "../../apis";
import { ArticlesList } from "../../components/Articles";
import { Tabs } from "../../components/Common";
import {
  TopCategories,
  TopFeaturedArticles,
  TopUsers,
} from "../../components/Sidebar";

const ArticlesPage = () => {
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

  const { isLoading: featuredLoading, data: featuredArticles } = useQuery(
    ["featuredArticles"],
    getFeaturedArticles,
    {
      onSuccess: (data) => {
        console.log("featured: ", data);
      },
      enabled: activeTab === 1,
    }
  );

  console.log("activeTab: ", activeTab);

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

          {activeTab === 0 &&
            (isLoading ? (
              <div>Loading...</div>
            ) : articles && articles.length > 0 ? (
              <ArticlesList articles={articles} />
            ) : (
              <p className="text-center">No Articles</p>
            ))}

          {activeTab === 1 &&
            (featuredLoading ? (
              <div>Loading...</div>
            ) : articles && articles.length > 0 ? (
              <ArticlesList articles={featuredArticles} />
            ) : (
              <p className="text-center">No Articles</p>
            ))}
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
