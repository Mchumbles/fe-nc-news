import { useContext } from "react";
import { UserContext } from "../contexts/user";

export default function Header() {
  const { isLoggedIn, loggedInUser } = useContext(UserContext);
  return (
    <header id="header">
      <h1>NC NEWS</h1>
      <h2>Welcome {isLoggedIn ? loggedInUser.username : "guest"}</h2>
      {isLoggedIn ? (
        <img
          className="avatar-img"
          src={loggedInUser.avatar_url}
          alt={`Avatar of ${loggedInUser.username}`}
        />
      ) : null}
    </header>
  );
}
