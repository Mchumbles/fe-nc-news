import { useEffect, useState } from "react";
import Loading from "./Loading";
import { fetchTopics } from "../../api";
import { Link } from "react-router-dom";
import Error from "./Error";

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
          <li key={topic.slug} role="listitem">
            <Link
              to={`/topics/${topic.slug}`}
              aria-label={`View articles in ${topic.slug}`}
            >
              <div
                className="relative bg-cover bg-center w-[20rem] h-[14rem] sm:w-[24rem] sm:h-[16rem] rounded-lg shadow-lg transition-transform transform hover:scale-105 overflow-hidden"
                style={{
                  backgroundImage: `url(${topic.topic_img})`,
                }}
                role="presentation"
              >
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center p-6">
                  <div className="bg-gray-800 bg-opacity-90 p-4 sm:p-6 rounded-lg w-3/4">
                    <h3 className="text-lg sm:text-2xl font-bold text-white">
                      {topic.slug.charAt(0).toUpperCase() + topic.slug.slice(1)}
                    </h3>
                    <p className="text-xs sm:text-md text-gray-300 mt-2">
                      {topic.description}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
