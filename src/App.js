import React, { useState, useEffect } from "react";
import axios from "axios";
import Article from "./Article";
import "./App.css";

const WIKIPEDIA_API_URL = "https://en.wikipedia.org/w/api.php";

function App() {
  const [startArticle, setStartArticle] = useState(null);
  const [targetArticle, setTargetArticle] = useState(null);
  const [currentArticle, setCurrentArticle] = useState(null);
  const [path, setPath] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRandomArticles();
  }, []);

  const fetchRandomArticles = async () => {
    try {
      const randomStart = await fetchRandomArticle();
      const randomTarget = await fetchRandomArticle();

      const startLinks = await fetchArticleLinks(randomStart.title);

      setStartArticle(randomStart);
      setTargetArticle(randomTarget);
      setCurrentArticle({ title: randomStart.title, links: startLinks });
      setPath([randomStart.title]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching random articles:", error);
      setLoading(false);
    }
  };

  const fetchRandomArticle = async () => {
    const params = {
      action: "query",
      format: "json",
      list: "random",
      rnnamespace: 0,
      rnlimit: 1,
      origin: "*",
    };

    const response = await axios.get(WIKIPEDIA_API_URL, { params });
    return response.data.query.random[0];
  };

  const fetchArticleLinks = async (title) => {
    const params = {
      action: "parse",
      page: title,
      format: "json",
      prop: "links",
      origin: "*",
    };

    const response = await axios.get(WIKIPEDIA_API_URL, { params });
    return response.data.parse.links;
  };

  const handleLinkClick = async (title) => {
    if (title === targetArticle.title) {
      alert(`Congratulations! You reached the target: ${title}`);
      fetchRandomArticles();
      return;
    }

    try {
      const links = await fetchArticleLinks(title);
      setCurrentArticle({ title, links });
      setPath([...path, title]);
    } catch (error) {
      console.error("Error fetching article links:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (
    !currentArticle ||
    !currentArticle.links ||
    !targetArticle ||
    !startArticle
  ) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <h1>Wiki Race Game</h1>
      <p>
        Navigate from <strong>{startArticle.title}</strong> to{" "}
        <strong>{targetArticle.title}</strong>
      </p>
      <Article links={currentArticle.links} onLinkClick={handleLinkClick} />
      <div className="path">
        <h2>Path Taken:</h2>
        <ul>
          {path.map((title, index) => (
            <li key={index}>
              {title} {">"}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
