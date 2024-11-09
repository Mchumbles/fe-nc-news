import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { fetchSingleArticle, updateArticleVotes } from "../../api";
import Comments from "./Comments";
import Loading from "./Loading";
import { UserContext } from "../contexts/user";
import Error from "./Error";

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
    <section className="single-article-grid">
      <h2 className="single-article-header">{currArticle.title}</h2>
      <p className="single-article-text">{currArticle.body}</p>
      <img
        alt={`Image related to ${currArticle.topic}`}
        className="single-article-img"
        src={currArticle.article_img_url}
      />
      <p className="singe-article-author">{`Article author: ${currArticle.author}`}</p>
      <button onClick={handleUpVote} disabled={hasUpVoted}>
        UpVote
      </button>
      <p>{`Votes: ${votes}`}</p>
      <p>{loginPrompt}</p>
      <p>{voteError}</p>
      <button onClick={handleDownVote} disabled={hasDownVoted}>
        DownVote
      </button>
      <button onClick={toggleComments} className="toggle-comments-btn">
        {showComments ? "Hide Comments" : "Show Comments"}
      </button>
      {showComments && <Comments article_id={article_id} />}
    </section>
  );
}
