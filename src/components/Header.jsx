import { UserContext } from "../contexts/user";
import defaultAvatarUrl from "/images/default-avatar.png";
import { useContext } from "react";

export default function Header() {
  const { isLoggedIn, loggedInUser } = useContext(UserContext);

  return (
    <header className="flex items-center justify-between bg-blue-800 px-4 py-2">
      <h1 className="text-4xl text-white ml-10 mt-6 border-b border-white">
        NC NEWS
      </h1>
      <div className="flex flex-col items-end ml-auto mt-6">
        <h3 className="text-white mb-2">
          Welcome {isLoggedIn ? loggedInUser.username : "guest"}
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
      </div>
    </header>
  );
}
