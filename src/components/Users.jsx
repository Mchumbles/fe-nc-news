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
      .catch(() => {
        setIsError("An error occurred while fetching users");
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <Loading />;
  if (isError) return <Error msg={isError} />;

  return (
    <section className="wrapper px-4 sm:px-6 py-6" aria-live="polite">
      <h2 className="text-2xl font-bold text-center text-blue-800 border-b border-blue-800 pb-3">
        Current Users
      </h2>

      <ul className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 justify-center items-center">
        {currUsers.map((user) => (
          <li key={user.username} role="listitem" className="w-full sm:w-auto">
            <UserCard user={user} />
          </li>
        ))}
      </ul>
    </section>
  );
}
