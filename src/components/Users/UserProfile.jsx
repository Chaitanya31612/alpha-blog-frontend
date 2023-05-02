import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import Gravatar from "react-gravatar";
import { Link } from "react-router-dom";
import { getUser } from "../../apis";

const ProfileHeader = ({
  user,
  followersCount,
  followingsCount,
  articlesCount,
}) => {
  return (
    <div className="card border-0 text-center mb-5 bg-white rounded py-3 w-75 m-auto m-sm-0">
      <div className="card-body user-profile">
        <h5 className="card-title">
          <Gravatar
            email={user?.email}
            size={150}
            className="rounded-circle border mb-2"
          />
          <div className="d-flex justify-content-center align-items-center gap-1 mt-3">
            <Link
              to={`/users/${user?.id}`}
              className="fs-5 fw-bold text-decoration-none"
              style={{ color: "#242424" }}
            >
              {user?.username}
            </Link>
          </div>

          <div className="text-muted mb-3">
            <p className="text-dark my-2">{user?.email}</p>
            <small>
              <i>Joined {moment(user?.created_at).fromNow()}</i>
            </small>
          </div>

          <div className="d-flex align-items-center justify-content-center gap-3 my-3">
            <div className="card-text py-2 d-flex flex-column">
              <span className="text-muted fw-bolder fs-6 mb-2">
                {followersCount}
              </span>
              <span
                className="text-muted text-uppercase"
                style={{ fontSize: "13px", letterSpacing: "1px" }}
              >
                Follower{followersCount != 1 && "s"}
              </span>
            </div>
            <div className="card-text py-2 d-flex flex-column">
              <span className="text-muted fw-bolder fs-6 mb-2">
                {articlesCount}
              </span>
              <span
                className="text-muted text-uppercase"
                style={{ fontSize: "13px", letterSpacing: "1px" }}
              >
                Article{articlesCount != 1 && "s"}
              </span>
            </div>
            <div className="card-text py-2 d-flex flex-column">
              <span className="text-muted fw-bolder fs-6 mb-2">
                {followingsCount}
              </span>
              <span
                className="text-muted text-uppercase"
                style={{ fontSize: "13px", letterSpacing: "1px" }}
              >
                Following
              </span>
            </div>
          </div>
        </h5>
      </div>
    </div>
  );
};

const FollowingsSection = ({ followings }) => {
  return (
    <>
      {followings?.length > 0 && (
        <div className="p-5 pt-3">
          <p className="text-black fw-bold">Following</p>
          {followings.map((followedUser) => (
            <Link
              key={followedUser.id}
              to={`/users/${followedUser.id}`}
              className="user-entry text-decoration-none"
            >
              <Gravatar
                email={followedUser.email}
                size={20}
                className="rounded-circle border"
              />
              <div className="flex-column flex-grow-1 justify-content-center gap-3">
                <span className="fw-normal" style={{ fontSize: "14px" }}>
                  {followedUser.username}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

const FollowersSection = ({ followers }) => {
  return (
    <>
      {followers?.length > 0 && (
        <div className="p-5 pt-3">
          <p className="text-black fw-bold">Followers</p>
          {followers.map((follower) => (
            <Link
              key={follower.id}
              to={`/users/${follower.id}`}
              className="user-entry text-decoration-none"
            >
              <Gravatar
                email={follower.email}
                size={20}
                className="rounded-circle border"
              />
              <div className="flex-column flex-grow-1 justify-content-center gap-3">
                <span className="fw-normal" style={{ fontSize: "14px" }}>
                  {follower.username}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

const UserProfile = ({ userId }) => {
  const {
    isError,
    isLoading,
    error,
    data: user,
  } = useQuery(["user", userId], () => getUser(userId), {
    onError: (error) => {
      console.log("Error: ", error);
    },
    onSuccess: (data) => {
      console.log("userprofile: ", data);
    },
  });
  const { followers, followings, articles } = user || {};

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="sticky-top" style={{ zIndex: 100 }}>
      {/* Profile Header */}
      <ProfileHeader
        user={user}
        followersCount={followers?.length}
        followingsCount={followings?.length}
        articlesCount={articles.length}
      />

      {/* Followings */}
      <FollowingsSection followings={followings} />

      {/* Followers */}
      <FollowersSection followers={followers} />
    </div>
  );
};

export default UserProfile;
