import { useEffect, useState } from "react";
import Loading from "./Loading";
import { fetchTopics } from "../../api";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

export default function Topics() {
  const [currTopics, setCurrTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchTopics().then((topics) => {
      setCurrTopics(topics);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section>
      <h2>Current article topics</h2>
      <ul>
        {currTopics.map((topic) => {
          return (
            <Link to={`/topics/${topic.slug}`} key={topic.slug}>
              <Card className="topics-card">
                <Card.Header>
                  <Card.Title>{`Topic: ${topic.slug}`}</Card.Title>
                </Card.Header>
                <Card.Text>{`Topic Description: ${topic.description}`}</Card.Text>
              </Card>
            </Link>
          );
        })}
      </ul>
    </section>
  );
}
