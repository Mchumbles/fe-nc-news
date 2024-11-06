import { useEffect, useState } from "react";
import Loading from "./Loading";
import { fetchUsers } from "../../api";
import UserCard from "./UserCard";

export default function Users() {
  const [isLoading, setIsLoading] = useState(true);
  const [currUsers, setCurrUsers] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetchUsers().then((users) => {
      setCurrUsers(users);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <ul className="users-list">
      {currUsers.map((user) => {
        return <UserCard user={user} key={user.username} />;
      })}
    </ul>
  );
}
