import DeleteArticleComment from "./DeleteArticleComment";

export default function CommentCard({
  comment,
  isLoggedIn,
  loggedInUser,
  setCurrComments,
  currComments,
}) {
  return (
    <li className="flex justify-center">
      <div
        className="p-4 sm:p-6 bg-white border border-gray-200 rounded-lg shadow-sm w-full max-w-[36rem] flex flex-col justify-center items-center text-center"
        aria-labelledby={`comment-${comment.comment_id}`}
      >
        {comment.deleted ? (
          <div
            className="p-4 bg-red-100 text-red-700 rounded-lg text-center"
            role="alert"
            aria-live="assertive"
          >
            <h3>Comment successfully deleted</h3>
          </div>
        ) : (
          <>
            <h3
              id={`comment-${comment.comment_id}`}
              className="text-black pb-3 text-sm sm:text-base"
            >
              {`Comment author: ${comment.author}`}
            </h3>

            <p className="text-black mb-2 px-4 sm:px-8 py-4 sm:py-6 border-b border-t border-black min-h-[80px] sm:min-h-[100px] w-full">
              {comment.body}
            </p>

            <p className="text-xs sm:text-sm text-black pt-3">{`Votes: ${comment.votes}`}</p>
            <p className="text-xs sm:text-sm text-black">{`Date commented: ${comment.formattedDate}`}</p>

            {isLoggedIn && loggedInUser.username === comment.author ? (
              <DeleteArticleComment
                comment_id={comment.comment_id}
                setCurrComments={setCurrComments}
                currComments={currComments}
              />
            ) : null}
          </>
        )}
      </div>
    </li>
  );
}
