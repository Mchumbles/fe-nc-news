import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="hidden md:flex items-center justify-center bg-blue-800">
      <ul className="flex space-x-6">
        <li>
          <Link className="text-white text-lg hover:underline" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="text-white text-lg hover:underline" to="/articles">
            Articles
          </Link>
        </li>
        <li>
          <Link className="text-white text-lg hover:underline" to="/topics">
            Topics
          </Link>
        </li>
        <li>
          <Link className="text-white text-lg hover:underline" to="/users">
            Users
          </Link>
        </li>
      </ul>
    </nav>
  );
}
