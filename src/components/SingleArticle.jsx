import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchSingleArticle } from "../../api";
import Comments from "./Comments";
import Loading from "./Loading";

export default function SingleArticle() {
  const [currArticle, setCurrArticle] = useState({});
  const [showComments, setShowComments] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { article_id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    fetchSingleArticle(article_id).then((articleById) => {
      setCurrArticle(articleById);
      setIsLoading(false);
    });
  }, [article_id]);

  const toggleComments = () => {
    setShowComments((currentState) => !currentState);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="single-article-grid">
      <h2 className="single-article-header">{currArticle.title}</h2>
      <p className="single-article-text">{currArticle.body}</p>
      <img className="single-article-img" src={currArticle.article_img_url} />
      <p className="singe-article-author">{`Article author: ${currArticle.author}`}</p>

      <button onClick={toggleComments} className="toggle-comments-btn">
        {showComments ? "Hide Comments" : "Show Comments"}
      </button>

      {showComments && <Comments article_id={article_id} />}
    </section>
  );
}
