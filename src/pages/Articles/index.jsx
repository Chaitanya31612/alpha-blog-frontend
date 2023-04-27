import { useQuery } from "@tanstack/react-query";
import { loadArticles } from "../../apis";
import { useAuth } from "../../contexts/AuthContext";

const Articles = () => {
  const { isError, isLoading, error, data } = useQuery(
    ["articles"],
    loadArticles,
    {
      onError: (error) => {
        console.log("Error: ", error);
      },
      onSuccess: (data) => {
        console.log("Success: ", data);
      },
    }
  );
  const { currentUser } = useAuth();
  console.log(data);

  return (
    <>
      <div>Articles</div>
      {isLoading && <div>Loading...</div>}
      {isError && <div>error</div>}

      {currentUser && (
        <div>
          <p>{currentUser.username}</p>
          <p>{currentUser.email}</p>
        </div>
      )}
    </>
  );
};

export default Articles;
