import { useEffect, useState, useContext } from "react";
import { fetchArticleComments } from "../../api";
import { Card } from "react-bootstrap";
import Loading from "./Loading";
import PostArticleComment from "./PostArticleComment";
import { UserContext } from "../contexts/user";
import DeleteArticleComment from "./DeleteArticleComment";

export default function Comments(props) {
  const { article_id } = props;

  const [isLoading, setIsLoading] = useState(true);
  const [currComments, setCurrComments] = useState([]);
  const { isLoggedIn, loggedInUser } = useContext(UserContext);

  useEffect(() => {
    setIsLoading(true);
    fetchArticleComments(article_id).then((comments) => {
      setCurrComments(comments);
      setIsLoading(false);
    });
  }, [article_id]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section>
      {isLoggedIn ? (
        <PostArticleComment
          article_id={article_id}
          setCurrComments={setCurrComments}
        />
      ) : (
        <p>Want to make a comment? Make sure you're signed in!</p>
      )}
      <ul className="comment-list">
        {currComments.map((comment) => {
          if (comment.deleted) {
            return (
              <Card className="comment-card-delete" key={comment.comment_id}>
                <Card.Header>
                  <Card.Title>{"Comment successfully deleted"}</Card.Title>
                </Card.Header>
              </Card>
            );
          } else {
            return (
              <Card className="comment-card" key={comment.comment_id}>
                <Card.Header>
                  <Card.Title>{`Comment author: ${comment.author}`}</Card.Title>
                </Card.Header>
                <Card.Text>{comment.body}</Card.Text>
                <Card.Text>{`Votes: ${comment.votes}`}</Card.Text>
                <Card.Text>{`Date commented: ${comment.formattedDate}`}</Card.Text>
                {isLoggedIn && loggedInUser.username === comment.author ? (
                  <DeleteArticleComment
                    comment_id={comment.comment_id}
                    setCurrComments={setCurrComments}
                    currComments={currComments}
                  />
                ) : null}
              </Card>
            );
          }
        })}
      </ul>
    </section>
  );
}
