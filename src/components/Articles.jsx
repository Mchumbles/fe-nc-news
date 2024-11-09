import { useEffect, useState } from "react";
import { fetchArticles } from "../../api";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import ArticleQueries from "./ArticleQueries";
import Error from "./Error";

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
      .catch((error) => {
        setIsError("An error occurred while fetching articles");
        setIsLoading(false);
      });
  }, [order, sortBy]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error msg={isError} />;
  }

  if (currArticles.length === 0) {
    return <h2>No Articles Found</h2>;
  }

  return (
    <section>
      <ArticleQueries
        setOrder={setOrder}
        order={order}
        setSortBy={setSortBy}
        sortBy={sortBy}
      />
      <ul className="article-list">
        {currArticles.map((article) => (
          <Card className="article-card" key={article.article_id}>
            <Card.Header>
              <Link to={`/articles/${article.article_id}`}>
                <Card.Title>{article.title}</Card.Title>
              </Link>
            </Card.Header>
            <Link to={`/topics/${article.topic}`}>
              <Card.Text>{`Topic: ${article.topic}`}</Card.Text>
            </Link>
            <Card.Text>{`Author: ${article.author}`}</Card.Text>
            <Card.Text>{`Votes: ${article.votes}`}</Card.Text>
            <Card.Text>{`Date Posted: ${article.formattedDate}`}</Card.Text>
          </Card>
        ))}
      </ul>
    </section>
  );
}
