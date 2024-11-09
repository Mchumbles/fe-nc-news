import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import { UserContext } from "./contexts/user";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Articles from "./components/Articles";
import SingleArticle from "./components/SingleArticle";
import Users from "./components/Users";
import Topics from "./components/Topics";
import ArticlesByTopic from "./components/ArticlesByTopic";
import "./App.css";
import PageNotFound from "./components/PageNotFound";
function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  const isLoggedIn = Object.keys(loggedInUser).length > 0;
  return (
    <UserContext.Provider value={{ loggedInUser, setLoggedInUser, isLoggedIn }}>
      <div className="app">
        <Header />
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/:article_id" element={<SingleArticle />} />
          <Route path="/users" element={<Users />} />
          <Route path="/topics" element={<Topics />} />
          <Route path="/topics/:slug" element={<ArticlesByTopic />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </UserContext.Provider>
  );
}

export default App;
