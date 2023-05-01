import React from "react";
import Gravatar from "react-gravatar";
import { Link } from "react-router-dom";

const UserResultList = ({ users }) => {
  return (
    <>
      {users.map((user) => (
        <Link
          to={`/users/${user.id}`}
          key={user.id}
          className="search-page__entry border-bottom text-decoration-none"
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

export default UserResultList;
