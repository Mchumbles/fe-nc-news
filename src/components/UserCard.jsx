import { useContext } from "react";
import { UserContext } from "../contexts/user";

export default function UserCard({ user }) {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);

  const handleClick = () => {
    setLoggedInUser(user);
  };

  const isLoggedIn = loggedInUser?.username === user.username;

  return (
    <article
      className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm mx-auto sm:m-0"
      key={user.username}
      aria-labelledby={`user-card-${user.username}`}
    >
      <div className="border-b border-gray-200 pb-4 mb-4">
        <h3
          id={`user-card-${user.username}`}
          className="text-xl font-semibold text-gray-800 text-center"
        >
          {`Username: ${user.username}`}
        </h3>
      </div>
      <img
        className="w-24 h-24 rounded-full mx-auto mb-4"
        src={user.avatar_url}
        alt={`Avatar of ${user.username}`}
        aria-describedby={`user-card-${user.username}-avatar`}
      />
      <p id={`user-card-${user.username}-avatar`} className="sr-only">
        {`Avatar of ${user.username}`}
      </p>
      <button
        onClick={handleClick}
        disabled={isLoggedIn}
        className={`w-full py-2 px-4 rounded-lg text-white transition ${
          isLoggedIn
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-800"
        }`}
        aria-label={
          isLoggedIn
            ? `Logged in as ${user.username}`
            : `Log in as ${user.username}`
        }
      >
        {isLoggedIn ? "Logged In" : "Log In"}
      </button>
    </article>
  );
}
