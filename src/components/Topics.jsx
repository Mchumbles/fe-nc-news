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
        setCurrTopics(topics);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsError("An error occurred while fetching topics");
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error msg={isError} />;
  }

  if (currTopics.length === 0) {
    return <h2>No Topics Found</h2>;
  }

  return (
    <section className="wrapper" aria-labelledby="topics-section">
      <header className="text-2xl font-bold text-center pt-3 pb-3 mb-6 text-blue-800 border-b border-b-blue-800">
        <h2 id="topics-section">Current Article Topics</h2>
      </header>

      <ul className="flex flex-wrap justify-center items-center" role="list">
        {currTopics.map((topic) => {
          return (
            <li key={topic.slug} role="listitem" className="m-10">
              <Link
                to={`/topics/${topic.slug}`}
                aria-label={`View articles in ${
                  topic.slug.charAt(0).toUpperCase() + topic.slug.slice(1)
                } topic`}
              >
                <div
                  className="relative bg-cover bg-center w-[24rem] h-[16rem] rounded-lg shadow-lg transition-transform transform hover:scale-110 overflow-hidden"
                  style={{
                    backgroundImage: `url(${topic.topic_img})`,
                  }}
                  role="presentation"
                >
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center p-10">
                    <div className="bg-gray-800 bg-opacity-90 p-6 rounded-lg w-64 h-40">
                      <h3
                        className="text-2xl font-bold text-white"
                        aria-live="polite"
                      >
                        {topic.slug.charAt(0).toUpperCase() +
                          topic.slug.slice(1)}{" "}
                      </h3>
                      <p className="text-md text-gray-300 mt-2">
                        {topic.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
