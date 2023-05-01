import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getTopCategories } from "../../apis";
import { CategoryIcon } from "../../assets/images";

const TopCategories = () => {
  const { isLoading, data: topCategories } = useQuery(
    ["topCategories"],
    getTopCategories,
    {
      onSuccess: (data) => {
        console.log("top: ", data);
      },
    }
  );

  return (
    <div className="py-3 border-bottom">
      <p className="text-black fw-bold">
        Top Categories
        <small>
          <Link
            to="/categories"
            className="text-success text-decoration-none badge"
          >
            See all({topCategories?.length})
          </Link>
        </small>
      </p>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {topCategories &&
            topCategories.length > 0 &&
            topCategories.map((category) => (
              <div key={category.id}>
                <Link
                  to={`/categories/${category.id}`}
                  className="text-decoration-none text-muted d-flex align-items-center gap-2 mb-2"
                >
                  <div className="d-flex align-items-center gap-2 p-2 text-dark">
                    <CategoryIcon />
                    <span className="fw-normal" style={{ fontSize: "14px" }}>
                      {category.name}
                    </span>
                  </div>
                </Link>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default TopCategories;
