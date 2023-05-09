import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import Gravatar from "react-gravatar";
import {
  Link,
  Navigate,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { getSearchResults } from "../../apis";
import { Tabs } from "../../components/Common";

const UserSearchResult = ({ users }) => {
  return (
    <>
      {users.map((user) => (
        <Link
          to={`/users/${user.id}`}
          key={user.id}
          className="search-page__entry border-bottom text-decoration-none min-vw-25"
        >
          <Gravatar
            email={user.email}
            size={40}
            className="rounded-circle border"
          />

          <div className="flex-column flex-grow-1 justify-content-center gap-3">
            <span className="fw-bold">{user?.username}</span>
            <br />
            <small>{user?.email}</small>
            <br />
            <small>{user?.admin ? "Staff" : "User"}</small>
          </div>
        </Link>
      ))}
    </>
  );
};

const ArticleSearchResult = ({ articles }) => {
  console.log("articles: ", articles);
  return (
    <>
      {articles.map((article) => (
        <Link
          to={`/articles/${article.id}`}
          key={article.id}
          className="search-page__entry border-bottom text-decoration-none min-vw-25"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-file-earmark-check-fill"
            viewBox="0 0 16 16"
          >
            <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zm1.354 4.354-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708.708z" />
          </svg>
          <div className="flex-column flex-grow-1 justify-content-center gap-3">
            <span className="fw-bold">{article.title}</span>
            <br />
            <small>Article</small>
          </div>
        </Link>
      ))}
    </>
  );
};

const CategorySearchResult = ({ categories }) => {
  return (
    <>
      {categories.map((category) => (
        <Link
          to={`/categories/${category.id}`}
          key={category.id}
          className="search-page__entry border-bottom text-decoration-none min-vw-25"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-tags-fill"
            viewBox="0 0 16 16"
          >
            <path d="M2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586V2zm3.5 4a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
            <path d="M1.293 7.793A1 1 0 0 1 1 7.086V2a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l.043-.043-7.457-7.457z" />
          </svg>
          <div className="flex-column flex-grow-1 justify-content-center gap-3">
            <span className="fw-bold">{category.name}</span>
            <br />
            <small>Category</small>
          </div>
        </Link>
      ))}
    </>
  );
};

const Search = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = useMemo(() => searchParams.get("q"), [searchParams]);

  const [activeTab, setActiveTab] = useState(0);

  const searchTabs = [
    {
      name: "All",
    },
    {
      name: "Users",
    },
    {
      name: "Articles",
    },
    {
      name: "Categories",
    },
  ];

  const { isError, isLoading, error, data } = useQuery(
    ["search", searchQuery],
    () => getSearchResults(searchQuery),
    {
      onError: (error) => {
        console.log("Error: ", error);
      },
      onSuccess: (data) => {
        console.log("Success: ", data);
      },
      enabled: !!searchQuery,
    }
  );

  const { users, articles, categories } = data || {};

  if (!searchQuery) {
    return navigate(-1);
  }

  if (isError) {
    setTimeout(() => {
      navigate("/");
    }, 3000);
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="search">
      <div className="search-page">
        <span
          className="btn-close m-5 fs-3"
          id="search-close"
          onClick={() => navigate(-1)}
        />
        <div className="container">
          <h1 className="text-center my-5 fw-bolder">Search Results</h1>
          <div className="search-page__tabs my-5 pb-2 border-bottom">
            <Tabs
              tabs={searchTabs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </div>

          {isLoading && <div>Loading...</div>}

          {activeTab === 0 && (
            <>
              {users && <UserSearchResult users={users} />}
              {articles && <ArticleSearchResult articles={articles} />}
              {categories && <CategorySearchResult categories={categories} />}
            </>
          )}

          {activeTab === 1 && (
            <>{users && <UserSearchResult users={users} />}</>
          )}

          {activeTab === 2 && (
            <>{articles && <ArticleSearchResult articles={articles} />}</>
          )}

          {activeTab === 3 && (
            <>
              {categories && <CategorySearchResult categories={categories} />}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
