import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "./Loading";
import { fetchArticleByTopic } from "../../api";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import ArticleQueries from "./ArticleQueries";

export default function ArticlesByTopic() {
  const { slug } = useParams();
  const [currArticles, setCurrArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState("created_at");
  const [order, setOrder] = useState("desc");

  useEffect(() => {
    setIsLoading(true);
    fetchArticleByTopic(slug, order, sortBy).then((articles) => {
      setCurrArticles(articles);
      setIsLoading(false);
    });
  }, [slug, order, sortBy]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section>
      <ArticleQueries
        setOrder={setOrder}
        order={order}
        setSortBy={setSortBy}
        sortBy={sortBy}
        topics={true}
      />
      <ul className="article-list">
        {currArticles.map((article) => (
          <Card className="article-card" key={article.article_id}>
            <Card.Header>
              <Link to={`/articles/${article.article_id}`}>
                <Card.Title>{article.title}</Card.Title>
              </Link>
            </Card.Header>
            <Card.Text>{`Topic: ${article.topic}`}</Card.Text>
            <Card.Text>{`Author: ${article.author}`}</Card.Text>
            <Card.Text>{`Date Posted: ${article.formattedDate}`}</Card.Text>
          </Card>
        ))}
      </ul>
    </section>
  );
}
