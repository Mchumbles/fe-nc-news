import { useEffect, useContext, useState } from "react";
import { sendArticleComment } from "../../api";
import { UserContext } from "../contexts/user";
import Loading from "./Loading";

export default function PostArticleComment(props) {
  const { article_id, setCurrComments } = props;
  const { loggedInUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [postCommentError, setPostCommentError] = useState("");
  const [newCommentValue, setNewCommentValue] = useState("");
  const [postingMessage, setPostingMessage] = useState("");
  const [postSuccessful, setPostSuccessful] = useState("");
  const [btnDisable, setBtnDisable] = useState(false);
  const isLoggedIn = !!loggedInUser;

  const handleSubmit = (event) => {
    event.preventDefault();
    setPostingMessage("Posting comment...");
    setPostSuccessful("");

    const optimisticComment = {
      comment_id: Date.now(),
      author: loggedInUser.username,
      body: newCommentValue,
      votes: 0,
      formattedDate: new Date().toLocaleString(),
    };
    setCurrComments((currComments) => [optimisticComment, ...currComments]);
    sendArticleComment(article_id, loggedInUser.username, newCommentValue)
      .then(() => {
        setNewCommentValue("");
        setPostingMessage("");
        setPostSuccessful("Post Successful!");
      })
      .catch((error) => {
        setPostCommentError(
          "Your comment was not successful. Please try again!"
        );
        setPostingMessage("");
        setPostSuccessful("");
        setCurrComments((currComments) => currComments.slice(1));
      });
  };

  useEffect(() => {
    setBtnDisable(postingMessage.length > 0);
  }, [postingMessage]);

  useEffect(() => {
    if (!postingMessage && newCommentValue === "") {
      document.getElementById("comment-input").focus();
    }
  }, [postingMessage, newCommentValue]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="wrapper" aria-labelledby="comment-form">
      <h2 id="comment-form" className="sr-only">
        Post a comment
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 flex flex-col justify-center items-center"
        aria-live="polite"
      >
        <p className="text-lg text-black">
          What would you like to comment, {loggedInUser.username}?
        </p>

        <label htmlFor="comment-input" className="sr-only">
          Enter your comment
        </label>
        <input
          id="comment-input"
          value={newCommentValue}
          onChange={(e) => setNewCommentValue(e.target.value)}
          placeholder="Enter your comment here"
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />

        <button
          type="submit"
          disabled={!isLoggedIn || btnDisable}
          className="w-64 p-3 bg-blue-500 text-white rounded-lg disabled:bg-gray-400 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Submit your comment"
        >
          Submit comment!
        </button>

        <div className="text-lg">
          <p role="alert" className="text-red-500">
            {postCommentError}
          </p>
          <p role="status" className="text-green-500">
            {postingMessage}
          </p>
          <p role="status" className="text-green-500">
            {postSuccessful}
          </p>
        </div>
      </form>
    </section>
  );
}
