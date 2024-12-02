import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { fetchSingleArticle, updateArticleVotes } from "../../api";
import Comments from "./Comments";
import Loading from "./Loading";
import { UserContext } from "../contexts/user";
import Error from "./Error";
import { ThumbUpIcon, ThumbDownIcon } from "@heroicons/react/solid";

export default function SingleArticle() {
  const [currArticle, setCurrArticle] = useState({});
  const [showComments, setShowComments] = useState(false);
  const [votes, setVotes] = useState(0);
  const [hasUpVoted, setHasUpVoted] = useState(false);
  const [hasDownVoted, setHasDownVoted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [voteError, setVoteError] = useState("");
  const [loginPrompt, setLoginPrompt] = useState("");
  const { article_id } = useParams();
  const { isLoggedIn } = useContext(UserContext);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetchSingleArticle(article_id)
      .then((articleById) => {
        setCurrArticle(articleById);
        setVotes(articleById.votes);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.status === 400) {
          setIsError("Bad request");
        } else if (error.status === 404) {
          setIsError("Article not found");
        } else {
          setIsError("An error occurred while fetching the article");
        }
        setIsLoading(false);
      });
  }, [article_id]);

  const toggleComments = () => {
    setShowComments((currentState) => !currentState);
  };

  const handleUpVote = () => {
    if (isLoggedIn) {
      if (hasDownVoted) {
        setVotes((currentCount) => currentCount + 2);
        setHasUpVoted(true);
        setHasDownVoted(false);
        updateArticleVotes(currArticle.article_id, 2).catch((error) => {
          setVotes((currentCount) => currentCount - 2);
          setHasUpVoted(false);
          setHasDownVoted(true);
          setVoteError("Something went wrong");
        });
      } else {
        setVotes((currentCount) => currentCount + 1);
        setHasUpVoted(true);
        updateArticleVotes(currArticle.article_id, 1).catch((error) => {
          setVotes((currentCount) => currentCount - 1);
          setHasUpVoted(false);
          setVoteError("Something went wrong");
        });
      }
    } else {
      setLoginPrompt("Please log in to vote");
      setTimeout(() => {
        setLoginPrompt("");
      }, 3000);
    }
  };

  const handleDownVote = () => {
    if (isLoggedIn) {
      if (hasUpVoted) {
        setVotes((currentCount) => currentCount - 2);
        setHasDownVoted(true);
        setHasUpVoted(false);
        updateArticleVotes(currArticle.article_id, -2).catch((error) => {
          setVotes((currentCount) => currentCount + 2);
          setHasDownVoted(false);
          setHasUpVoted(true);
          setVoteError("Something went wrong");
        });
      } else {
        setVotes((currentCount) => currentCount - 1);
        setHasDownVoted(true);
        updateArticleVotes(currArticle.article_id, -1).catch((error) => {
          setVotes((currentCount) => currentCount + 1);
          setHasDownVoted(false);
          setVoteError("Something went wrong");
        });
      }
    } else {
      setLoginPrompt("Please log in to vote");
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error msg={isError} />;
  }

  if (currArticle.length === 0) {
    return <h2>It doesn't look like this article exists!</h2>;
  }

  return (
    <section className="wrapper">
      <h2 className=" pt-4 pb-2 text-3xl font-bold text-blue-800 border-b border-b-blue-800">
        {currArticle.title}
      </h2>
      <p className="pb-6 pt-3 text-black text-lg leading-relaxed max-w-3xl flex justify-center items-center">
        {currArticle.body}
      </p>
      <img
        alt={`Image related to ${currArticle.topic}`}
        className="w-full rounded-lg object-cover"
        src={currArticle.article_img_url}
      />
      <p className=" pt-3 text-lg text-black">{`Article author: ${currArticle.author}`}</p>
      <p className="text-red-600 text-sm">{voteError}</p>
      <p className="text-blue-600 text-sm">{loginPrompt}</p>
      <div className="flex items-center justify-center">
        <button
          onClick={handleUpVote}
          disabled={hasUpVoted}
          className={`px-4 py-2 text-white font-semibold rounded-lg ${
            hasUpVoted
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          <ThumbUpIcon className="w-6 h-6" />
        </button>
        <p className="text-lg font-medium p-4">{`Votes: ${votes}`}</p>
        <button
          onClick={handleDownVote}
          disabled={hasDownVoted}
          className={`px-4 py-2 text-white font-semibold rounded-lg ${
            hasDownVoted
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700"
          }`}
        >
          <ThumbDownIcon className="w-6 h-6" />
        </button>
      </div>
      <button
        onClick={toggleComments}
        className="px-4 py-2 mb-5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg flex justify-center items-center"
      >
        {showComments ? "Hide Comments" : "Show Comments"}
      </button>
      {showComments && <Comments article_id={article_id} />}
    </section>
  );
}
