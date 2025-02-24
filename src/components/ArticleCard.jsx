import { Link } from "react-router-dom";

export default function ArticleCard({ article }) {
  return (
    <li className="pb-6 w-full flex justify-center">
      <article
        className="relative bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row items-start justify-between w-full max-w-[36rem]"
        aria-labelledby={`article-${article.article_id}`}
      >
        <div className="flex-1 pr-0 md:pr-4">
          <div className="border-b border-blue-800 pb-4 mb-4">
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
          className="mt-4 md:mt-0"
        >
          <img
            alt={`Image related to article titled ${article.title}`}
            className="w-24 h-24 md:w-36 md:h-36 object-cover rounded-lg"
            src={article.article_img_url}
          />
        </Link>
      </article>
    </li>
  );
}
