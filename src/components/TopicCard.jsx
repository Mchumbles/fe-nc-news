import { Link } from "react-router-dom";

export default function TopicCard({ topic }) {
  return (
    <li key={topic.slug} role="listitem">
      <Link
        to={`/topics/${topic.slug}`}
        aria-label={`View articles in ${topic.slug}`}
      >
        <div
          className="relative bg-cover bg-center w-[20rem] h-[14rem] sm:w-[24rem] sm:h-[16rem] rounded-lg shadow-lg transition-transform transform hover:scale-105 overflow-hidden"
          style={{ backgroundImage: `url(${topic.topic_img})` }}
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
  );
}
