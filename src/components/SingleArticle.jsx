import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchSingleArticle } from "../../api";

export default function SingleArticle() {
  const [currArticle, setCurrArticle] = useState({});
  const { article_id } = useParams();

  useEffect(() => {
    fetchSingleArticle(article_id).then((articleById) => {
      setCurrArticle(articleById);
    });
  }, [article_id]);

  return (
    <section className="single-article-grid">
      <h2 className="single-article-header">{currArticle.title}</h2>
      <p className="single-article-text">{currArticle.body}</p>
      <img className="single-article-img" src={currArticle.article_img_url} />
      <p className="singe-article-author">{`Article author: ${currArticle.author}`}</p>
    </section>
  );
}
