import { UserContext } from "../contexts/user";
import defaultAvatarUrl from "/images/default-avatar.png";
import { useContext } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const isLoggedIn = !!loggedInUser;

  const handleSignOut = () => {
    setLoggedInUser(null);
    localStorage.removeItem("loggedInUser");
  };

  return (
    <header className="flex items-center justify-between bg-blue-800 px-4 py-2">
      <Link className="no-underline" to="/">
        <h1 className="text-6xl text-white ml-10 mt-6 border-b border-white">
          NC NEWS
        </h1>
      </Link>
      <div className="flex flex-col items-end ml-auto mt-6 mr-10">
        <h3 className="text-white mb-2">
          Welcome, {isLoggedIn ? loggedInUser.username : "guest"}!
        </h3>
        <img
          className="w-24 h-24 rounded-full"
          src={
            isLoggedIn && loggedInUser?.avatar_url
              ? loggedInUser.avatar_url
              : defaultAvatarUrl
          }
          alt={`Avatar of ${isLoggedIn ? loggedInUser.username : "guest"}`}
        />
        {isLoggedIn && (
          <button
            onClick={handleSignOut}
            className="mt-2 hover:shadow-xl text-white px-4"
          >
            Sign Out
          </button>
        )}
      </div>
    </header>
  );
}
