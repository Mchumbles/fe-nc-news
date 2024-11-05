import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://be-nc-news-mwge.onrender.com/api",
});

export function fetchArticles() {
  return apiClient.get("/articles").then((response) => {
    return response.data.articles;
  });
}

export function fetchSingleArticle(article_id) {
  return apiClient.get(`/articles/${article_id}`).then((response) => {
    return response.data.article;
  });
}
