import { Link } from "react-router-dom";

export default function NavBar() {
  const navOptions =
    "pl-10 pr-10 pb-2 pt-2 text-white text-xl border-l border-r border-white hover:shadow-xl";

  return (
    <nav
      className="flex items-center justify-center bg-blue-800 pb-6"
      aria-label="Main Navigation"
    >
      <ul className="flex">
        <li>
          <Link
            className={navOptions}
            to="/"
            role="link"
            aria-label="Go to Home page"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            className={navOptions}
            to="/articles"
            role="link"
            aria-label="Go to Articles page"
          >
            Articles
          </Link>
        </li>
        <li>
          <Link
            className={navOptions}
            to="/topics"
            role="link"
            aria-label="Go to Topics page"
          >
            Topics
          </Link>
        </li>
        <li>
          <Link
            className={navOptions}
            to="/users"
            role="link"
            aria-label="Go to Users page"
          >
            Users
          </Link>
        </li>
      </ul>
    </nav>
  );
}
