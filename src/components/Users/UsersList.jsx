import { useQuery } from "@tanstack/react-query";
import { loadUsersList } from "../../apis/users";
import UsersListItem from "./UsersListItem";

const UsersList = () => {
  const {
    isError,
    isLoading,
    error,
    data: users,
  } = useQuery(["users"], loadUsersList, {
    onError: (error) => {
      console.log("Error: ", error);
    },
    onSuccess: (data) => {
      console.log("Success: ", data);
    },
  });
  console.log(users);

  return (
    <div className="container">
      <div id="users">
        <div className="row justify-content-md-center">
          <div className="col-md-10">
            <div className="row">
              {users &&
                users.map((user) => (
                  <UsersListItem key={user.id} user={user} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersList;
