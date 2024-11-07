import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="nav-bar">
      <Link className="nav-link" to="/">
        Home
      </Link>
      <Link className="nav-link" to="/articles">
        Articles
      </Link>
      <Link className="nav-link" to="/topics">
        Topics
      </Link>
      <Link className="nav-link" to="/users">
        Users
      </Link>
    </nav>
  );
}
