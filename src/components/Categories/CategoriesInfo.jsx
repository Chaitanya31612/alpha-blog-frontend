const CategoriesInfo = ({ isLoading, articlesCount, usersCount }) => {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="d-flex align-items-center gap-5">
      <div className="d-flex flex-column align-items-baseline gap-2 py-3">
        <span className="fw-bolder fs-4">{articlesCount}</span>
        <span className="text-muted">Article{articlesCount != 1 && "s"}</span>
      </div>
      <div className="d-flex flex-column align-items-baseline gap-2 py-3">
        <span className="fw-bolder fs-4">{usersCount}</span>
        <span className="text-muted">User{usersCount != 1 && "s"}</span>
      </div>
    </div>
  );
};

export default CategoriesInfo;
