import { useQuery } from "@tanstack/react-query";
import { loadCategoriesList } from "../../apis";
import CategoriesListItem from "./CategoriesListItem";

const CategoriesList = () => {
  const {
    isError,
    isLoading,
    error,
    data: categories,
  } = useQuery(["categories"], loadCategoriesList, {
    onError: (error) => {
      console.log("Error: ", error);
    },
    onSuccess: (data) => {
      console.log("Success: ", data);
    },
  });
  console.log(categories);

  const getRandomColor = () => {
    let color = "hsl(" + Math.random() * 360 + ", 100%, 90%)";
    return color;
  };

  return (
    <div className="container">
      <div className="row justify-content-md-center">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            {isError ? (
              <p>Error: {error.message}</p>
            ) : (
              <>
                {categories.length === 0 && (
                  <p className="text-center">No categories found.</p>
                )}
                {categories.map((category) => (
                  <CategoriesListItem
                    key={category.id}
                    category={category}
                    color={getRandomColor()}
                  />
                ))}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CategoriesList;
