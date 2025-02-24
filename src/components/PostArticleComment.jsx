import { useEffect, useContext, useState } from "react";
import { sendArticleComment } from "../../api";
import { UserContext } from "../contexts/user";
import Loading from "./Loading";

export default function PostArticleComment(props) {
  const { article_id, setCurrComments } = props;
  const { loggedInUser } = useContext(UserContext);
  const [isLoading] = useState(false);
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
    setPostCommentError("");

    let optimisticComment = {
      comment_id: Date.now(),
      optimistic_id: null,
      author: loggedInUser.username,
      body: newCommentValue,
      votes: 0,
      formattedDate: new Date().toLocaleString(),
    };

    setCurrComments((currComments) => [optimisticComment, ...currComments]);

    sendArticleComment(article_id, loggedInUser.username, newCommentValue)
      .then((response) => {
        const updatedComment = {
          ...optimisticComment,
          comment_id: response.comment_id,
        };
        setCurrComments((currComments) => {
          return currComments.map((comment) =>
            comment.comment_id === optimisticComment.comment_id
              ? { ...comment, comment_id: response.comment_id }
              : comment
          );
        });
        setNewCommentValue("");
        setPostingMessage("");
        setPostSuccessful("Post Successful!");
        setTimeout(() => {
          setPostSuccessful("");
        }, 3000);
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
    <section
      className="wrapper flex justify-center mb-10"
      aria-labelledby="comment-form"
    >
      <h2 id="comment-form" className="sr-only">
        Post a comment
      </h2>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[36rem] space-y-4 flex flex-col justify-center items-center bg-white p-4 sm:p-6 border border-gray-200 rounded-lg shadow-sm"
        aria-live="polite"
      >
        <p className="text-lg text-black text-center">
          What would you like to comment, {loggedInUser.username}?
        </p>

        <label htmlFor="comment-input" className="sr-only">
          Enter your comment
        </label>
        <textarea
          id="comment-input"
          value={newCommentValue}
          onChange={(e) => setNewCommentValue(e.target.value)}
          placeholder="Enter your comment here"
          required
          rows="3"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none overflow-hidden"
          onInput={(e) => {
            e.target.style.height = "auto";
            e.target.style.height = e.target.scrollHeight + "px";
          }}
        />

        <button
          type="submit"
          disabled={!isLoggedIn || btnDisable}
          className="w-64 p-3 bg-blue-500 text-white rounded-lg disabled:bg-gray-400 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Submit your comment"
        >
          Submit comment!
        </button>

        <div className="text-lg text-center">
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
