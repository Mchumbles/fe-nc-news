import { useEffect, useState } from "react";
import Loading from "./Loading";
import { fetchTopics } from "../../api";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
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
    <section className="wrapper">
      <h2 className="text-2xl font-bold text-center pt-3 pb-3 mb-6 text-blue-800 border-b border-b-blue-800">
        Current Article Topics
      </h2>
      <ul className="flex flex-col justify-center items-center">
        {currTopics.map((topic) => {
          return (
            <Link to={`/topics/${topic.slug}`} key={topic.slug}>
              <div className=" m-10 relative bg-cover bg-center w-96 h-48 rounded-lg shadow-lg transition-transform transform hover:scale-105 overflow-hidden">
                <div
                  className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center p-10"
                  style={{
                    backgroundImage: `url(${topic.topic_img})`,
                  }}
                >
                  <div className="bg-gray-800 bg-opacity-90 p-6 rounded-lg w-56 h-32">
                    <h3 className="text-xl font-bold text-white">
                      {topic.slug.charAt(0).toUpperCase() + topic.slug.slice(1)}{" "}
                    </h3>
                    <p className="text-sm text-gray-300 mt-2">
                      {topic.description}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </ul>
    </section>
  );
}
