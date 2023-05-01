import React from "react";
import { Link } from "react-router-dom";

const CategoryTags = ({ tags }) => {
  return (
    <>
      {tags.map((tag) => (
        <Link
          key={tag.id}
          to={`/categories/${tag.id}`}
          className="badge rounded-pill bg-success text-decoration-none text-white me-1"
        >
          {tag.name}
        </Link>
      ))}
    </>
  );
};

export default CategoryTags;
