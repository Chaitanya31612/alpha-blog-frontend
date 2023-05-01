import { useQuery } from "@tanstack/react-query";
import Gravatar from "react-gravatar";
import { Link } from "react-router-dom";
import { getTopUsers } from "../../apis";
import { CategoryIcon } from "../../assets/images";

const TopUsers = () => {
  const { isLoading, data: topUsers } = useQuery(["topUsers"], getTopUsers, {
    onSuccess: (data) => {
      console.log("top: ", data);
    },
  });

  return (
    <div className="py-3 border-bottom">
      <p className="text-black fw-bold">
        Top Users
        <small>
          <Link
            to="/categories"
            className="text-success text-decoration-none badge"
          >
            See all({topUsers?.length})
          </Link>
        </small>
      </p>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {topUsers &&
            topUsers.length > 0 &&
            topUsers.map((user) => (
              <div key={user.id}>
                <Link
                  to={`/users/${user.id}`}
                  className="text-decoration-none text-muted d-flex align-items-center gap-2 mb-2"
                >
                  <div className="d-flex align-items-center gap-2 p-2 text-dark">
                    <Gravatar
                      email={user.email}
                      size={20}
                      style={{ borderRadius: "50%" }}
                    />
                    <span className="fw-normal" style={{ fontSize: "14px" }}>
                      {user.username}
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

export default TopUsers;
