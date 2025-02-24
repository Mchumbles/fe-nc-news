import { useEffect, useState, useContext } from "react";
import { fetchArticleComments } from "../../api";
import Loading from "./Loading";
import PostArticleComment from "./PostArticleComment";
import { UserContext } from "../contexts/user";
import Error from "./Error";
import CommentCard from "./CommentCard";

export default function Comments({ article_id }) {
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
      .catch(() => {
        setIsError("An error occurred while fetching comments.");
        setIsLoading(false);
      });
  }, [article_id]);

  if (isLoading) return <Loading />;
  if (isError) return <Error msg={isError} />;
  if (currComments.length === 0) {
    return (
      <h2 className="text-center text-lg text-gray-700">
        No comments for this article yet!
      </h2>
    );
  }

  return (
    <section className="wrapper px-4 sm:px-6">
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
        {currComments.map((comment) => (
          <CommentCard
            key={comment.comment_id}
            comment={comment}
            isLoggedIn={isLoggedIn}
            loggedInUser={loggedInUser}
            setCurrComments={setCurrComments}
            currComments={currComments}
          />
        ))}
      </ul>
    </section>
  );
}
