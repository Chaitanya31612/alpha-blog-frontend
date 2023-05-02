import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { getUser } from "../../apis";
import { ArticlesList } from "../../components/Articles";
import { Tabs } from "../../components/Common";
import { UserProfile, UserResultList } from "../../components/Users";

const UserPage = () => {
  const params = useParams();

  const {
    isError,
    isLoading,
    error,
    data: user,
  } = useQuery(["user", params.id], () => getUser(params.id), {
    onError: (error) => {
      console.log("Error: ", error);
    },
    onSuccess: (data) => {
      console.log("user: ", data);
    },
  });

  const [activeTab, setActiveTab] = useState(0);

  const userPageTabs = [
    {
      name: "Articles",
      path: "/articles",
    },
    {
      name: "Following",
      path: "/articles/featured",
    },
    {
      name: "Followers",
      path: "/articles/featured",
    },
  ];

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <h1 className="text-center my-5 fw-bolder">{user?.username}'s Profile</h1>

      <div className="section-profile">
        <div style={{ flexGrow: 5, order: -1 }}>
          <div className="search-page__tabs mt-3 pb-2 border-bottom">
            <Tabs
              tabs={userPageTabs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </div>

          {isLoading ? (
            <div>Loading...</div>
          ) : activeTab === 0 ? (
            user.articles && user.articles.length > 0 ? (
              <ArticlesList articles={user.articles} />
            ) : (
              <p className="text-center">No Articles</p>
            )
          ) : activeTab === 1 ? (
            user.followings && user.followings.length > 0 ? (
              <UserResultList users={user.followings} />
            ) : (
              <p className="text-center">No Followings</p>
            )
          ) : activeTab === 2 ? (
            user.followers && user.followers.length > 0 ? (
              <UserResultList users={user.followers} />
            ) : (
              <p className="text-center">No Followers</p>
            )
          ) : (
            <div>No results</div>
          )}
        </div>

        <div
          style={{ flexGrow: 1, justifyItems: "end" }}
          className="d-sm-none d-lg-block"
        >
          <div className="sticky-top" style={{ zIndex: 100 }}>
            <UserProfile userId={user.id} />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserPage;
