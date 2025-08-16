import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function SearchBar() {
  const [term, setTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  function handleSubmit(e) {
    e.preventDefault();
    const params = new URLSearchParams(location.search);
    if (term.trim()) {
      params.set("search", term);
    } else {
      params.delete("search");
    }
    navigate({ pathname: "/", search: params.toString() });
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search news..."
        value={term}
        onChange={e => setTerm(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;