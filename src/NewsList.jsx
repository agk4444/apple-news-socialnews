import React, { useEffect, useState, useRef } from "react";
import NewsCard from "./NewsCard";
import { useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const BASE_URL = "https://socialnews.xyz/wp-json/wp/v2/posts?_embed";

function NewsList() {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const query = useQuery();
  const category = query.get("category");
  const search = query.get("search");

  const observer = useRef();

  useEffect(() => {
    setArticles([]);
    setPage(1);
    setHasMore(true);
  }, [category, search]);

  useEffect(() => {
    async function fetchArticles() {
      setLoading(true);
      let url = `${BASE_URL}&per_page=10&page=${page}`;
      if (category) url += `&categories=${category}`;
      if (search) url += `&search=${encodeURIComponent(search)}`;

      const res = await fetch(url);
      if (!res.ok) {
        setHasMore(false);
        setLoading(false);
        return;
      }
      const data = await res.json();
      setArticles(prev => [...prev, ...data]);
      setHasMore(data.length === 10);
      setLoading(false);
    }
    fetchArticles();
  }, [page, category, search]);

  const lastArticleRef = useRef();

  useEffect(() => {
    if (loading || !hasMore) return;
    if (lastArticleRef.current) lastArticleRef.current.disconnect();
    lastArticleRef.current = new window.IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setPage(prev => prev + 1);
      }
    });
    if (document.getElementById("end-of-list")) {
      lastArticleRef.current.observe(document.getElementById("end-of-list"));
    }
  }, [loading, hasMore, articles]);

  return (
    <div className="news-list">
      {articles.map((article, i) => (
        <NewsCard
          key={article.id}
          article={article}
          link={`/article/${article.id}`}
        />
      ))}
      {loading && <p>Loading...</p>}
      {!loading && hasMore && (
        <div id="end-of-list" style={{ height: "20px" }} />
      )}
      {!hasMore && <p style={{ textAlign: "center" }}>No more articles</p>}
    </div>
  );
}

export default NewsList;