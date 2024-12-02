import { useContext, useState } from "react";
import { Card } from "react-bootstrap";
import { UserContext } from "../contexts/user";

export default function UserCard(props) {
  const { user } = props;

  const [currLoggedIn, setCurrLogedIn] = useState(false);

  const { setLoggedInUser } = useContext(UserContext);

  const handleClick = () => {
    setLoggedInUser(user);
    setCurrLogedIn(true);
  };

  return (
    <div
      className="bg-white rounded-lg shadow-lg p-6 w-96 m-10"
      key={user.username}
    >
      <div className="border-b border-gray-200 pb-4 mb-4">
        <h3 className="text-xl font-semibold text-gray-800">{`Username: ${user.username}`}</h3>
      </div>
      <img
        className="w-24 h-24 rounded-full mx-auto mb-4"
        src={user.avatar_url}
        alt={`Avatar of ${user.username}`}
      />
      <button
        onClick={handleClick}
        disabled={currLoggedIn}
        className={`w-full py-2 px-4 rounded-lg text-white ${
          currLoggedIn
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-800"
        }`}
      >
        Log in
      </button>
    </div>
  );
}
