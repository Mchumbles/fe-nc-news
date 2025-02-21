import { useState, useEffect } from "react";
import Loading from "./Loading";
import Error from "./Error";
import { fetchArticles } from "../../api";
import { Link } from "react-router-dom";

export default function Home() {
  const [featuredArticles, setFeaturedArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetchArticles()
      .then((articles) => {
        const featured = articles
          .sort(() => Math.random() - Math.random())
          .slice(0, 3);
        setFeaturedArticles(featured);
        setIsLoading(false);
      })
      .catch(() => {
        setIsError("An error occurred while fetching articles");
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error msg={isError} aria-live="assertive" />;
  }

  return (
    <section className="wrapper px-4 py-8">
      <h2 className="pb-3 pt-3 text-2xl font-bold text-center mb-6 text-blue-800 border-b border-b-blue-800">
        Home Page
      </h2>

      <h3 className="text-xl mb-4 pb-3 text-center text-blue-800 border-b border-b-blue-800">
        Featured Articles
      </h3>

      <ul className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {featuredArticles.map((article) => (
          <li
            className="pb-6 flex justify-center"
            key={article.article_id}
            aria-labelledby={`article-${article.article_id}`}
          >
            <div className="relative bg-white rounded-lg shadow-md p-4 flex flex-col items-stretch w-full sm:w-80 h-auto sm:h-[28rem]">
              <div className="flex-grow">
                <Link
                  className="hover:underline no-underline"
                  to={`/articles/${article.article_id}`}
                  aria-labelledby={`article-title-${article.article_id}`}
                >
                  <h2
                    id={`article-title-${article.article_id}`}
                    className="text-lg font-semibold text-gray-800"
                  >
                    {article.title}
                  </h2>
                </Link>
                <p className="text-sm text-black">{`Topic: ${article.topic}`}</p>
                <p className="text-sm text-black">{`Author: ${article.author}`}</p>
                <p className="text-sm text-black">{`Votes: ${article.votes}`}</p>
                <p className="text-sm text-black">{`Date Posted: ${article.formattedDate}`}</p>
              </div>
              <Link
                to={`/articles/${article.article_id}`}
                className="mt-4 flex justify-center"
                aria-label={`Read full article: ${article.title}`}
              >
                <img
                  alt={`Image for article: ${article.title}`}
                  className="w-32 h-32 sm:w-36 sm:h-36 object-cover rounded-lg"
                  src={article.article_img_url}
                />
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
