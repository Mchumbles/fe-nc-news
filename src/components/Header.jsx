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
    <header
      role="banner"
      className="flex items-center justify-between bg-blue-800 px-4 py-2"
    >
      <a href="#main-content" className="sr-only">
        Skip to main content
      </a>

      <Link className="no-underline" to="/">
        <h1 className="text-6xl text-white ml-10 mt-6 border-b border-t p-2 border-white">
          NC NEWS
        </h1>
      </Link>

      <div className="flex items-center ml-auto mt-4 mr-10 space-x-4">
        <img
          className="w-24 h-24 rounded-full"
          src={
            isLoggedIn && loggedInUser?.avatar_url
              ? loggedInUser.avatar_url
              : defaultAvatarUrl
          }
          alt={
            isLoggedIn
              ? `User avatar of ${loggedInUser.username}`
              : "Guest avatar"
          }
        />
        <div className="flex flex-col items-end">
          <h2 className="text-white text-sm mb-2" aria-live="polite">
            Welcome, {isLoggedIn ? loggedInUser.username : "guest"}!
          </h2>
          {isLoggedIn && (
            <button
              onClick={handleSignOut}
              className="mt-2 hover:shadow-xl text-white px-4"
              aria-label="Sign out of your account"
            >
              Sign Out
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
