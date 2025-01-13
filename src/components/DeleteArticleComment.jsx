import { useState } from "react";
import { deleteArticleComment } from "../../api";

export default function DeleteArticleComment(props) {
  const { comment_id, setCurrComments, currComments } = props;
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
    setDeleteMsg("Deleting comment...");
    setBtnDisable(true);
    deleteArticleComment(comment_id)
      .then(() => {
        setDeleteMsg("");
        setCompleteDelMsg("Comment successfully deleted.");
        const filteredComments = currComments.map((comment) => {
          if (comment.comment_id === comment_id) {
            return { ...comment, deleted: true };
          }
          return comment;
        });
        setCurrComments([...filteredComments]);
      })
      .catch((error) => {
        setBtnDisable(false);
        setDeleteMsg(
          "Deleting your comment was unsuccessful. Please try again."
        );
      });
  };

  const handleCancel = () => {
    setConfirmDelete(false);
    setDeleteMsg("");
  };

  return (
    <div>
      <p className="text-gray-700" role="status" aria-live="assertive">
        {deleteMsg}
      </p>
      <p className="text-green-500" role="status" aria-live="assertive">
        {completeDelMsg}
      </p>

      {!confirmDelete ? (
        <button
          onClick={handleClick}
          disabled={btnDisable}
          className="w-44 py-2 px-4 bg-red-500 text-white rounded-lg disabled:bg-gray-400 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          aria-label="Delete this comment"
        >
          Delete comment
        </button>
      ) : (
        <>
          <button
            onClick={handleClick}
            disabled={btnDisable}
            className="w-44 py-2 px-4 bg-red-500 text-white rounded-lg disabled:bg-gray-400 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 mb-2"
            aria-label="Confirm deletion of the comment"
            autoFocus
          >
            Confirm Delete
          </button>

          <button
            onClick={handleCancel}
            disabled={btnDisable}
            className="w-44 py-2 px-4 bg-gray-300 text-black rounded-lg disabled:bg-gray-400 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
            aria-label="Cancel the deletion of the comment"
          >
            Cancel
          </button>
        </>
      )}
    </div>
  );
}
