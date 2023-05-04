import Gravatar from "react-gravatar";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import moment from "moment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { followUser, unfollowUser } from "../../apis";

const UsersListItem = ({ user }) => {
  const { currentUser, setCurrentUser } = useAuth();
  const queryClient = useQueryClient();
  console.log("currentUser: ", currentUser);

  const followUserMutation = useMutation(
    ["followUser"],
    () => followUser(user.id),
    {
      onSuccess: (data) => {
        console.log("follow user: ", data);
        const { followings } = data;
        setCurrentUser({
          ...currentUser,
          followings,
        });
        queryClient.invalidateQueries({ queryKey: ["users"] });
      },
    }
  );

  const unfollowUserMutation = useMutation(
    ["unfollowUser"],
    () => unfollowUser(user.id),
    {
      onSuccess: (data) => {
        console.log("unfollow user: ", data);
        const { followings } = data;
        setCurrentUser({
          ...currentUser,
          followings,
        });
        queryClient.invalidateQueries({ queryKey: ["users"] });
      },
    }
  );

  const checkFollowingStatus = (from, to) => {
    return (
      from.followings?.filter((following) => following.id === to.id).length > 0
    );
  };

  const handleFollow = (userId, action) => {
    if (action === "follow") {
      console.log("follow", userId);
      followUserMutation.mutate(userId);
    } else {
      console.log("unfollow", userId);
      unfollowUserMutation.mutate(userId);
    }
  };

  return (
    <div className="col-sm-6 col-xl-4">
      <div
        className="card border-5 text-center mb-5 bg-white rounded py-3"
        id="article-card"
      >
        <div className="card-body user-profile">
          <h5 className="card-title">
            <Link to={`/users/${user.id}`} className="text-decoration-none">
              <Gravatar
                email={user.email}
                size={150}
                style={{ borderRadius: "50%" }}
                className="border mb-1"
              />
            </Link>
          </h5>
          <div>
            <div className="d-flex justify-content-center align-items-center gap-1">
              <Link
                to={`/users/${user.id}`}
                className="text-decoration-none fs-5 fw-semibold"
                style={{ color: "#242424" }}
              >
                {user.username}
              </Link>

              {currentUser && currentUser.id !== user.id && (
                <>
                  {checkFollowingStatus(currentUser, user) ? (
                    <span
                      className="d-block badge bg-success ms-1"
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={() => handleFollow(user.id, "unfollow")}
                    >
                      Following
                    </span>
                  ) : (
                    <span
                      className="d-block badge bg-primary ms-1"
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={() => handleFollow(user.id, "follow")}
                    >
                      Follow
                    </span>
                  )}
                </>
              )}
              {/* {user.id !== currentUser.id && (
              {currentUser.followings.includes()}
            )} */}
              {/* <% if user != current_user %>
              <% if current_user.following?(user) %>
                  <%= link_to("/unfollow/#{user.id}", method: :post, className: "text-decoration-none") do %>
                    <span className="d-block badge bg-success ms-1">Following</span>
                  <% end %>
              <% elsif user.following?(current_user) %>
                <%= link_to("/follow/#{user.id}", method: :post, className: "text-decoration-none") do %>
                  <span className="d-block badge bg-primary ms-1">Follow Back</span>
                <% end %>
              <% else %>
                <%= link_to("/follow/#{user.id}", method: :post, className: "text-decoration-none") do %>
                  <span className="d-block badge bg-primary ms-1">Follow</span>
                <% end %>
              <% end %>
            <% end %> */}
            </div>
            <div className="text-muted mb-3">
              <small>
                <i>Joined {moment(user.created_at).fromNow()}</i>
              </small>
            </div>
            <div className="d-flex align-items-center justify-content-center gap-3 my-3">
              <div className="card-text py-1 d-flex flex-column">
                <span className="text-muted fw-bolder fs-6">
                  {user.followersCount}
                </span>
                <span
                  className="text-muted text-uppercase"
                  style={{ fontSize: "13px", letterSpacing: "1px" }}
                >
                  Follower{user.followersCount != 1 && "s"}
                </span>
              </div>
              <div className="card-text py-1 d-flex flex-column">
                <span className="text-muted fw-bolder fs-6">
                  {user.articlesCount}
                </span>
                <span
                  className="text-muted text-uppercase"
                  style={{ fontSize: "13px", letterSpacing: "1px" }}
                >
                  Article{user.articlesCount != 1 && "s"}
                </span>
              </div>
              <div className="card-text py-1 d-flex flex-column">
                <span className="text-muted fw-bolder fs-6">
                  {user.followingsCount}
                </span>
                <span
                  className="text-muted text-uppercase"
                  style={{ fontSize: "13px", letterSpacing: "1px" }}
                >
                  Following
                </span>
              </div>
            </div>

            <Link
              to={`/users/${user.id}`}
              className="btn user-profile__btn--view my-2"
            >
              View Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersListItem;
