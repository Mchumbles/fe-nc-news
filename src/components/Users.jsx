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
    <section className="wrapper">
      <h2 className="text-2xl font-bold text-center pt-4 pb-4 mb-6 text-blue-800 border-b border-b-blue-800">
        Current Users
      </h2>
      <ul className="flex flex-col items-center justify-center">
        {currUsers.map((user) => {
          return <UserCard user={user} key={user.username} />;
        })}
      </ul>
    </section>
  );
}
