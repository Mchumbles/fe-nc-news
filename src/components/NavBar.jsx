import { Link } from "react-router-dom";

export default function NavBar() {
  const navOptions =
    "pl-10 pr-10 pb-2 pt-2 text-white text-xl border-l border-r border-white hover:shadow-xl";
  return (
    <nav className="flex items-center justify-center bg-blue-800 pb-6 hover:caret-zinc-600">
      <Link className={navOptions} to="/">
        Home
      </Link>
      <Link className={navOptions} to="/articles">
        Articles
      </Link>
      <Link className={navOptions} to="/topics">
        Topics
      </Link>
      <Link className={navOptions} to="/users">
        Users
      </Link>
    </nav>
  );
}
