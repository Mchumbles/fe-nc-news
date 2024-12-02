import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://be-nc-news-mwge.onrender.com/api",
});

export function fetchArticles(order = "desc", sort_by = "created_at") {
  const params = {
    order: order,
    sort_by: sort_by,
  };
  return apiClient
    .get("/articles", { params })
    .then((response) => {
      const formattedArticles = response.data.articles.map((article) => {
        const articleDate = new Date(article.created_at);
        const formattedDate = articleDate.toLocaleString();
        return { ...article, formattedDate };
      });
      return formattedArticles;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}

export function fetchSingleArticle(article_id) {
  return apiClient
    .get(`/articles/${article_id}`)
    .then((response) => {
      const article = response.data.article;
      const articleDate = new Date(article.created_at);
      const formattedDate = articleDate.toLocaleString();
      return { ...article, formattedDate };
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}

export function fetchArticleComments(article_id) {
  return apiClient
    .get(`/articles/${article_id}/comments`)
    .then((response) => {
      const formattedComments = response.data.comments.map((comment) => {
        const commentDate = new Date(comment.created_at);
        const formattedDate = commentDate.toLocaleString();
        return { ...comment, formattedDate };
      });
      return formattedComments;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}

export function fetchUsers() {
  return apiClient
    .get("/users")
    .then((response) => {
      return response.data.users;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}

export function updateArticleVotes(article_id, voteInc) {
  return apiClient
    .patch(`/articles/${article_id}`, { inc_votes: voteInc })
    .catch((error) => {
      return Promise.reject(error);
    });
}

export function sendArticleComment(article_id, user, comment) {
  return apiClient
    .post(`/articles/${article_id}/comments`, {
      username: user,
      body: comment,
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}

export function deleteArticleComment(comment_id) {
  return apiClient.delete(`/comments/${comment_id}`).catch((error) => {
    return Promise.reject(error);
  });
}

export function fetchTopics() {
  return apiClient
    .get("/topics")
    .then((response) => {
      const topics = response.data.topics;
      return Promise.all(
        topics.map((topic) =>
          apiClient.get(`/articles?topic=${topic.slug}`).then((response) => {
            const article = response.data.articles[0];
            topic.topic_img = article.article_img_url;
            return topic;
          })
        )
      );
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}

export function fetchArticleByTopic(
  topic,
  order = "desc",
  sort_by = "created_at"
) {
  const params = {
    order: order,
    sort_by: sort_by,
  };
  return apiClient
    .get(`/articles`, { params })
    .then((response) => {
      const filteredArticles = response.data.articles.filter((article) => {
        if (article.topic === topic) {
          return article;
        }
      });
      const formattedArticles = filteredArticles.map((article) => {
        const articleDate = new Date(article.created_at);
        const formattedDate = articleDate.toLocaleString();
        return { ...article, formattedDate };
      });
      return formattedArticles;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}
