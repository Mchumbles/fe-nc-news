import { useEffect, useState } from "react";
import Loading from "./Loading";
import { fetchTopics } from "../../api";
import Error from "./Error";
import TopicCard from "./TopicCard";

export default function Topics() {
  const [currTopics, setCurrTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetchTopics()
      .then((topics) => {
        if (topics && Array.isArray(topics)) {
          setCurrTopics(topics);
        }
        setIsLoading(false);
      })
      .catch(() => {
        setIsError("An error occurred while fetching topics");
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <Loading />;
  if (isError) return <Error msg={isError} />;
  if (currTopics.length === 0) return <h2>No Topics Found</h2>;

  return (
    <section className="px-4 py-6" aria-labelledby="topics-section">
      <header className="text-2xl font-bold text-center mb-6 text-blue-800 border-b border-blue-800 pb-3">
        <h2 id="topics-section">Current Article Topics</h2>
      </header>

      <ul className="flex flex-wrap justify-center gap-6" role="list">
        {currTopics.map((topic) => (
          <TopicCard key={topic.slug} topic={topic} />
        ))}
      </ul>
    </section>
  );
}
