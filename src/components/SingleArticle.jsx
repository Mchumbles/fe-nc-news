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
  const { loggedInUser } = useContext(UserContext);
  const [isError, setIsError] = useState(null);
  const isLoggedIn = !!loggedInUser;

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
        updateArticleVotes(currArticle.article_id, 2).catch(() => {
          setVotes((currentCount) => currentCount - 2);
          setHasUpVoted(false);
          setHasDownVoted(true);
          setVoteError("Something went wrong");
        });
      } else {
        setVotes((currentCount) => currentCount + 1);
        setHasUpVoted(true);
        updateArticleVotes(currArticle.article_id, 1).catch(() => {
          setVotes((currentCount) => currentCount - 1);
          setHasUpVoted(false);
          setVoteError("Something went wrong");
        });
      }
    } else {
      setLoginPrompt("Please log in to vote");
      setTimeout(() => setLoginPrompt(""), 3000);
    }
  };

  const handleDownVote = () => {
    if (isLoggedIn) {
      if (hasUpVoted) {
        setVotes((currentCount) => currentCount - 2);
        setHasDownVoted(true);
        setHasUpVoted(false);
        updateArticleVotes(currArticle.article_id, -2).catch(() => {
          setVotes((currentCount) => currentCount + 2);
          setHasDownVoted(false);
          setHasUpVoted(true);
          setVoteError("Something went wrong");
        });
      } else {
        setVotes((currentCount) => currentCount - 1);
        setHasDownVoted(true);
        updateArticleVotes(currArticle.article_id, -1).catch(() => {
          setVotes((currentCount) => currentCount + 1);
          setHasDownVoted(false);
          setVoteError("Something went wrong");
        });
      }
    } else {
      setLoginPrompt("Please log in to vote");
    }
  };

  if (isLoading) return <Loading />;
  if (isError) return <Error msg={isError} />;
  if (currArticle.length === 0)
    return <h2>It doesn't look like this article exists!</h2>;

  return (
    <article
      className="wrapper w-full px-4 sm:px-6"
      aria-labelledby="article-title"
    >
      <header className="text-center">
        <h1 className="pt-4 pb-2 text-2xl sm:text-3xl font-bold text-blue-800 border-b border-blue-800">
          {currArticle.title}
        </h1>
      </header>

      <section className="pb-6 pt-3 text-black text-lg leading-relaxed max-w-3xl w-full mx-auto text-justify">
        <p>{currArticle.body}</p>
      </section>

      <figure className="w-full flex flex-col items-center">
        <img
          alt={`Image related to ${currArticle.topic}`}
          className="w-full max-w-4xl h-auto rounded-lg object-cover"
          src={currArticle.article_img_url}
        />
        <figcaption className="pt-3 text-lg text-black text-center w-full">
          {`Article author: ${currArticle.author}`}
        </figcaption>
      </figure>

      <section className="text-center">
        <p className="text-red-600 text-sm">{voteError}</p>
        <p className="text-blue-600 text-sm">{loginPrompt}</p>
      </section>

      <div className="flex items-center justify-center gap-4 my-4">
        <button
          onClick={handleUpVote}
          disabled={hasUpVoted}
          className={`px-4 py-2 text-white font-semibold rounded-lg ${
            hasUpVoted
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
          aria-label="Upvote this article"
        >
          <ThumbUpIcon className="w-6 h-6" />
        </button>

        <p className="text-lg font-medium">{`Votes: ${votes}`}</p>

        <button
          onClick={handleDownVote}
          disabled={hasDownVoted}
          className={`px-4 py-2 text-white font-semibold rounded-lg ${
            hasDownVoted
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700"
          }`}
          aria-label="Downvote this article"
        >
          <ThumbDownIcon className="w-6 h-6" />
        </button>
      </div>

      <button
        onClick={toggleComments}
        className="px-4 py-2 mb-5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg flex justify-center items-center w-full max-w-xs mx-auto"
        aria-expanded={showComments}
        aria-controls="comments-section"
      >
        {showComments ? "Hide Comments" : "Show Comments"}
      </button>

      {showComments && <Comments article_id={article_id} />}
    </article>
  );
}
