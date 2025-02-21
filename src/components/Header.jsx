import { UserContext } from "../contexts/user";
import defaultAvatarUrl from "/images/default-avatar.png";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { IoMdMenu, IoMdClose } from "react-icons/io";

export default function Header() {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLoggedIn = !!loggedInUser;

  const handleSignOut = () => {
    setLoggedInUser(null);
    localStorage.removeItem("loggedInUser");
  };

  return (
    <header className="flex items-center justify-between bg-blue-800 px-4 py-3 relative">
      <Link className="no-underline" to="/">
        <h1 className="text-4xl md:text-5xl lg:text-6xl text-white border-b border-t p-2 border-white">
          NC NEWS
        </h1>
      </Link>

      <div className="hidden md:flex flex-col items-center">
        <img
          className="w-12 h-12 md:w-16 md:h-16 lg:w-24 lg:h-24 rounded-full"
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
        <h2 className="text-white text-sm mt-2">
          Welcome, {isLoggedIn ? loggedInUser.username : "guest"}!
        </h2>
        {isLoggedIn && (
          <button
            onClick={handleSignOut}
            className="text-white text-xs mt-1 hover:underline"
          >
            Sign Out
          </button>
        )}
      </div>

      <button
        className="text-white text-3xl md:hidden"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <IoMdClose /> : <IoMdMenu />}
      </button>

      {isMenuOpen && (
        <nav className="absolute top-full right-0 w-full bg-blue-900 p-4 md:hidden z-50">
          <ul className="flex flex-col items-center space-y-4">
            <li>
              <Link
                className="text-white text-xl"
                to="/"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                className="text-white text-xl"
                to="/articles"
                onClick={() => setIsMenuOpen(false)}
              >
                Articles
              </Link>
            </li>
            <li>
              <Link
                className="text-white text-xl"
                to="/topics"
                onClick={() => setIsMenuOpen(false)}
              >
                Topics
              </Link>
            </li>
            <li>
              <Link
                className="text-white text-xl"
                to="/users"
                onClick={() => setIsMenuOpen(false)}
              >
                Users
              </Link>
            </li>
            {isLoggedIn && (
              <li>
                <button
                  onClick={handleSignOut}
                  className="text-white text-xl hover:underline"
                >
                  Sign Out
                </button>
              </li>
            )}
          </ul>
        </nav>
      )}
    </header>
  );
}
