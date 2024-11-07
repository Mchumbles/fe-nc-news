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
    <form onSubmit={handleSubmit}>
      <p>What would you like to comment?</p>
      <input
        value={newCommentValue}
        onChange={(e) => setNewCommentValue(e.target.value)}
        placeholder="Enter your comment here"
        required="required"
      />
      <button type="submit" disabled={!isLoggedIn || btnDisable}>
        Submit comment!
      </button>
      <p>{postCommentError}</p>
      <p>{postingMessage}</p>
      <p>{postSuccessful}</p>
    </form>
  );
}
