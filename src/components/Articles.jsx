import { useEffect, useState } from "react";
import { fetchArticles } from "../../api";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import SingleArticle from "./SingleArticle";

export default function Articles() {
  const [currArticles, setCurrArticles] = useState([]);

  useEffect(() => {
    fetchArticles().then((articles) => {
      setCurrArticles(articles);
    });
  }, []);

  return (
    <section>
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
            <Card.Text>{`Date Posted: ${article.created_at}`}</Card.Text>
          </Card>
        ))}
      </ul>
    </section>
  );
}
