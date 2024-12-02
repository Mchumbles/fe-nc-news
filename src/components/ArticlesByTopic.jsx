import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "./Loading";
import { fetchArticleByTopic } from "../../api";
import { Link } from "react-router-dom";
import ArticleQueries from "./ArticleQueries";
import Error from "./Error";

export default function ArticlesByTopic() {
  const { slug } = useParams();
  const [currArticles, setCurrArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState("created_at");
  const [order, setOrder] = useState("desc");
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetchArticleByTopic(slug, order, sortBy)
      .then((articles) => {
        setCurrArticles(articles);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsError("An error occurred while fetching articles");
        setIsLoading(false);
      });
  }, [slug, order, sortBy]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error msg={isError} />;
  }

  if (currArticles.length === 0) {
    return (
      <h2 className="text-center text-xl font-semibold mt-4">
        No articles for this topic currently!
      </h2>
    );
  }

  return (
    <section className="wrapper">
      <h2 className="pb-3 pt-3 text-2xl font-bold text-center mb-6 text-blue-800 border-b border-b-blue-800">
        Articles in {slug}
      </h2>
      <ArticleQueries
        setOrder={setOrder}
        order={order}
        setSortBy={setSortBy}
        sortBy={sortBy}
      />
      <ul className="flex flex-col justify-center items-center">
        {currArticles.map((article) => (
          <li className="pb-6" key={article.article_id}>
            <div className="relative bg-white rounded-lg shadow-md p-6 flex items-start justify-between w-[36rem]">
              <div className="flex-1 pr-4">
                <div className="border-b border-blue-800 pb-4 mb-4">
                  <Link to={`/articles/${article.article_id}`}>
                    <h2 className="text-2xl font-semibold text-gray-800">
                      {article.title}
                    </h2>
                  </Link>
                </div>
                <Link
                  to={`/topics/${article.topic}`}
                  className="text-blue-500 hover:underline"
                >
                  <p className="text-sm text-black">{`Topic: ${article.topic}`}</p>
                </Link>
                <p className="text-sm text-black">{`Author: ${article.author}`}</p>
                <p className="text-sm text-black">{`Votes: ${article.votes}`}</p>
                <p className="text-sm text-black">{`Date Posted: ${article.formattedDate}`}</p>
              </div>
              <Link to={`/articles/${article.article_id}`}>
                <img
                  alt={`Image related to ${article.article_img_url}`}
                  className="absolute inset-auto right-12 bottom-6 m-auto w-36 h-36 object-cover rounded-lg ml-4"
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
