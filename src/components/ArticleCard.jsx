import { Link } from "react-router-dom";

export default function ArticleCard({ article }) {
  return (
    <li className="pb-6 w-full flex justify-center" key={article.article_id}>
      <article
        className="relative bg-white rounded-lg shadow-md p-6 flex flex-col justify-center items-center w-full max-w-[36rem] min-h-[18rem] md:flex-row md:items-center md:justify-between"
        aria-labelledby={`article-${article.article_id}`}
      >
        <div className="flex-1 flex flex-col justify-center items-center text-center md:items-start md:text-left">
          <div className="border-b border-blue-800 pb-4 mb-4 w-full">
            <Link
              className="hover:underline no-underline"
              to={`/articles/${article.article_id}`}
              aria-label={`Read full article: ${article.title}`}
            >
              <h3
                id={`article-${article.article_id}`}
                className="text-2xl font-semibold text-gray-800"
              >
                {article.title}
              </h3>
            </Link>
          </div>

          <Link
            to={`/topics/${article.topic}`}
            className="text-blue-500 hover:underline no-underline"
            aria-label={`View more articles about ${article.topic}`}
          >
            <p className="text-sm text-black">{`Topic: ${article.topic}`}</p>
          </Link>

          <p className="text-sm text-black">{`Author: ${article.author}`}</p>
          <p className="text-sm text-black">{`Votes: ${article.votes}`}</p>
          <p className="text-sm text-black">{`Date Posted: ${article.formattedDate}`}</p>
        </div>

        <Link
          to={`/articles/${article.article_id}`}
          aria-label={`View article image: ${article.title}`}
          className="mt-4 md:mt-0 md:self-center md:absolute md:bottom-4 md:right-4"
        >
          <img
            alt={`Image related to article titled ${article.title}`}
            src={article.article_img_url}
            className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 object-cover rounded-lg mx-auto md:mx-0"
          />
        </Link>
      </article>
    </li>
  );
}
