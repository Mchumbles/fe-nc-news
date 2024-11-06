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
    <Card className="users-card" key={user.username}>
      <Card.Header className="users-header">
        <Card.Title>{`Username: ${user.username}`}</Card.Title>
      </Card.Header>
      <Card.Img className="users-avatar" src={user.avatar_url} />
      <button onClick={handleClick} disabled={currLoggedIn}>
        Log in
      </button>
    </Card>
  );
}
