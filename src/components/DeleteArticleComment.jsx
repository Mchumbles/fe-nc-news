import { UserContext } from "../contexts/user";
import { useContext, useState } from "react";
import { deleteArticleComment } from "../../api";

export default function DeleteArticleComment(props) {
  const { comment_id, setCurrComments, currComments } = props;
  const { isLoggedIn, loggedInUser } = useContext(UserContext);
  const [deleteMsg, setDeleteMsg] = useState("");
  const [completeDelMsg, setCompleteDelMsg] = useState("");
  const [btnDisable, setBtnDisable] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleClick = () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      setDeleteMsg("Are you sure you want to delete this comment?");
      return;
    }
    setDeleteMsg("Deleting comment");
    setBtnDisable(true);
    deleteArticleComment(comment_id)
      .then(() => {
        setDeleteMsg("");
        setCompleteDelMsg("Comment successfully deleted");
        const filteredComments = currComments.map((comment) => {
          if (comment.comment_id === comment_id) {
            return { ...comment, body: null };
          }
          return comment;
        });
        setCurrComments([...filteredComments]);
      })
      .catch((error) => {
        setBtnDisable(false);
        setDeleteMsg(
          "Deleting your comment was unsuccessful. Please try again!"
        );
      });
  };

  const handleCancel = () => {
    setConfirmDelete(false);
    setDeleteMsg("");
  };

  return (
    <>
      <p>{deleteMsg}</p>
      <p>{completeDelMsg}</p>
      {!confirmDelete ? (
        <button onClick={handleClick} disabled={btnDisable}>
          Delete comment
        </button>
      ) : (
        <>
          <button onClick={handleClick} disabled={btnDisable}>
            Confirm Delete
          </button>
          <button onClick={handleCancel} disabled={btnDisable}>
            Cancel
          </button>
        </>
      )}
    </>
  );
}
