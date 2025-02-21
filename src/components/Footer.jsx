import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-blue-800 text-white flex flex-wrap items-center justify-between px-6 py-4 text-sm md:text-base">
      <Link
        className="no-underline shrink-0"
        to="/"
        aria-label="Go to NC News homepage"
      >
        <h1 className="text-lg md:text-xl lg:text-2xl text-white border-b border-t p-1 border-white">
          NC NEWS
        </h1>
      </Link>

      <nav className="flex flex-col sm:flex-row items-center sm:space-x-4 sm:space-y-0 space-y-1">
        <a
          href="https://github.com/Mchumbles/fe-nc-news"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-gray-500"
          aria-label="View the frontend source code on GitHub"
        >
          Frontend
        </a>
        <a
          href="https://github.com/Mchumbles/be-nc-news"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-gray-500"
          aria-label="View the backend source code on GitHub"
        >
          Backend
        </a>
        <a
          href="https://www.linkedin.com/in/lewis-mcguire-51a4a1327/?trk=public-profile-join-page"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-gray-500"
          aria-label="Visit LinkedIn profile of Lewis McGuire, the creator of this project"
        >
          LinkedIn
        </a>
      </nav>

      <div className="text-right shrink-0 sm:max-w-[12rem] md:max-w-[16rem] lg:max-w-[20rem]">
        <p className="text-sm sm:text-xs md:text-sm mt-3 leading-snug">
          Created as part of a Digital Skills Bootcamp <br />
          in Software Engineering with{" "}
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
