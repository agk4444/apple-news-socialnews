import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NewsList from "./NewsList";
import ArticlePage from "./ArticlePage";
import CategoryFilter from "./CategoryFilter";
import SearchBar from "./SearchBar";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <header>
          <h1>SocialNews.xyz Headlines</h1>
          <SearchBar />
          <CategoryFilter />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<NewsList />} />
            <Route path="/article/:id" element={<ArticlePage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;