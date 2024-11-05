import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Articles from "./components/Articles";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Header />
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<Articles />} />
      </Routes>
    </div>
  );
}

export default App;
