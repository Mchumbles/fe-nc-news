import { useEffect, useState } from "react";
import { fetchArticles } from "../../api";
import Loading from "./Loading";
import ArticleQueries from "./ArticleQueries";
import Error from "./Error";
import ArticleCard from "./ArticleCard";

export default function Articles() {
  const [currArticles, setCurrArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState("created_at");
  const [order, setOrder] = useState("desc");
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetchArticles(order, sortBy)
      .then((articles) => {
        setCurrArticles(articles);
        setIsLoading(false);
      })
      .catch(() => {
        setIsError("An error occurred while fetching articles.");
        setIsLoading(false);
      });
  }, [order, sortBy]);

  if (isLoading) return <Loading />;
  if (isError) return <Error msg={isError} />;
  if (currArticles.length === 0)
    return (
      <h2
        role="alert"
        aria-live="polite"
        className="text-2xl font-bold text-center mb-6"
      >
        No Articles Found
      </h2>
    );

  return (
    <section className="wrapper px-4 md:px-0">
      <header>
        <h2 className="pb-3 pt-3 text-2xl font-bold text-center mb-6 text-blue-800 border-b border-blue-800">
          All Articles
        </h2>
      </header>

      <ArticleQueries
        setOrder={setOrder}
        order={order}
        setSortBy={setSortBy}
        sortBy={sortBy}
      />

      <ul role="list" className="flex flex-col items-center">
        {currArticles.map((article) => (
          <ArticleCard key={article.article_id} article={article} />
        ))}
      </ul>
    </section>
  );
}
