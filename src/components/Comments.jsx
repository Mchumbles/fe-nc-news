import { useEffect, useState, useContext } from "react";
import { fetchArticleComments } from "../../api";
import Loading from "./Loading";
import PostArticleComment from "./PostArticleComment";
import { UserContext } from "../contexts/user";
import DeleteArticleComment from "./DeleteArticleComment";
import Error from "./Error";

export default function Comments(props) {
  const { article_id } = props;

  const [isLoading, setIsLoading] = useState(true);
  const [currComments, setCurrComments] = useState([]);
  const { loggedInUser } = useContext(UserContext);
  const [isError, setIsError] = useState(null);
  const isLoggedIn = !!loggedInUser;

  useEffect(() => {
    setIsLoading(true);
    fetchArticleComments(article_id)
      .then((comments) => {
        setCurrComments(comments);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsError("An error occurred while fetching comments.");
        setIsLoading(false);
      });
  }, [article_id]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error msg={isError} />;
  }

  if (currComments.length === 0) {
    return (
      <h2 className="text-center text-lg text-gray-700">
        No comments for this article yet!
      </h2>
    );
  }

  return (
    <section className="wrapper">
      {isLoggedIn ? (
        <PostArticleComment
          article_id={article_id}
          setCurrComments={setCurrComments}
        />
      ) : (
        <p className="text-center text-sm text-blue-800">
          Want to make a comment? Make sure you're signed in!
        </p>
      )}

      <ul className="space-y-4">
        {currComments.map((comment) => {
          return (
            <li key={comment.comment_id}>
              {comment.deleted ? (
                <div
                  className="p-4 bg-red-100 text-red-700 rounded-lg"
                  role="alert"
                  aria-live="assertive"
                >
                  <h3 className="text-center">Comment successfully deleted</h3>
                </div>
              ) : (
                <div
                  className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm w-auto flex flex-col justify-center items-center text-center"
                  aria-labelledby={`comment-${comment.comment_id}`}
                >
                  <div>
                    <h3
                      id={`comment-${comment.comment_id}`}
                      className="text-black pb-3"
                    >
                      {`Comment author: ${comment.author}`}
                    </h3>
                  </div>
                  <div className="flex flex-col justify-between w-full">
                    <p className="text-black mb-2 mx-20 pt-8 pb-8 border-b border-t border-black min-h-[100px]">
                      {comment.body}
                    </p>
                  </div>
                  <p className="text-sm text-black pt-3">{`Votes: ${comment.votes}`}</p>
                  <p className="text-sm text-black">{`Date commented: ${comment.formattedDate}`}</p>
                  {isLoggedIn && loggedInUser.username === comment.author ? (
                    <DeleteArticleComment
                      comment_id={comment.comment_id}
                      optamistic_id={comment.optamistic_id}
                      setCurrComments={setCurrComments}
                      currComments={currComments}
                    />
                  ) : null}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
