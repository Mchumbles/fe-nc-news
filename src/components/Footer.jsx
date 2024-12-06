import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-blue-800 text-white flex items-center justify-between px-6 py-4 mt-auto">
      <Link className="no-underline" to="/" aria-label="Go to NC News homepage">
        <h1 className="text-3xl text-white border-b border-t p-2 border-white">
          NC NEWS
        </h1>
      </Link>
      <nav className="flex space-x-6 mx-auto" aria-label="External links">
        <a
          href="https://github.com/Mchumbles/fe-nc-news"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-gray-300"
          aria-label="View the frontend source code on GitHub"
        >
          Frontend
        </a>
        <a
          href="https://github.com/Mchumbles/be-nc-news"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-gray-300"
          aria-label="View the backend source code on GitHub"
        >
          Backend
        </a>
        <a
          href="https://www.linkedin.com/in/lewis-mcguire-51a4a1327/?trk=public-profile-join-page"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-gray-300"
          aria-label="Visit LinkedIn profile of Lewis McGuire, the creator of this project"
        >
          LinkedIn
        </a>
      </nav>
      <div className="flex items-center">
        <p className="text-white text-sm">
          Created as part of a Digital Skills Bootcamp
          <br />
          in Software Engineering provided by{" "}
          <a
            href="https://www.northcoders.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:underline"
            aria-label="Visit the Northcoders website"
          >
            Northcoders
          </a>
        </p>
      </div>
    </footer>
  );
}
