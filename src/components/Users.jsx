import { useEffect, useState } from "react";
import Loading from "./Loading";
import { fetchUsers } from "../../api";
import UserCard from "./UserCard";
import Error from "./Error";

export default function Users() {
  const [isLoading, setIsLoading] = useState(true);
  const [currUsers, setCurrUsers] = useState([]);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetchUsers()
      .then((users) => {
        setCurrUsers(users);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsError("An error occurred while fetching users");
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error msg={isError} />;
  }

  return (
    <ul className="users-list">
      {currUsers.map((user) => {
        return <UserCard user={user} key={user.username} />;
      })}
    </ul>
  );
}
