import { useEffect, useContext, useState } from "react";
import { sendArticleComment } from "../../api";
import { UserContext } from "../contexts/user";
import Loading from "./Loading";

export default function PostArticleComment(props) {
  const { article_id, setCurrComments } = props;
  const { isLoggedIn, loggedInUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [postCommentError, setPostCommentError] = useState("");
  const [newCommentValue, setNewCommentValue] = useState("");
  const [postingMessage, setPostingMessage] = useState("");
  const [postSuccessful, setPostSuccessful] = useState("");
  const [btnDisable, setBtnDisable] = useState(false);

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
        setPostCommentError("Your like was not successful. Please try again!");
        setPostingMessage("");
        setPostSuccessful("");
        setCurrComments((currComments) => currComments.slice(1));
      });
  };

  useEffect(() => {
    setBtnDisable(postingMessage.length > 0);
  }, [postingMessage]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="wrapper">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 flex flex-col justify-center items-center"
      >
        <p className="text-lg text-black">
          What would you like to comment, {loggedInUser.username}?
        </p>
        <input
          value={newCommentValue}
          onChange={(e) => setNewCommentValue(e.target.value)}
          placeholder="Enter your comment here"
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <button
          type="submit"
          disabled={!isLoggedIn || btnDisable}
          className="w-64 p-3 bg-blue-500 text-white rounded-lg disabled:bg-gray-400 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 "
        >
          Submit comment!
        </button>
        <p className="text-red-500">{postCommentError}</p>
        <p className="text-green-500">{postingMessage}</p>
        <p className="text-green-500">{postSuccessful}</p>
      </form>
    </section>
  );
}
