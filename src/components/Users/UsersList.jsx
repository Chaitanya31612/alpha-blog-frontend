import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { loadUsersList } from "../../apis/users";
import UsersListItem from "./UsersListItem";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const { isError, isLoading, error, data } = useQuery(
    ["users"],
    loadUsersList,
    {
      onError: (error) => {
        console.log("Error: ", error);
      },
      onSuccess: (data) => {
        console.log("Success: ", data);
        setUsers(data);
      },
    }
  );

  if (isLoading) return <div>Loading...</div>;

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
