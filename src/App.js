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

  useEffect(() => {
    fetchRandomArticles();
  }, []);

  const fetchRandomArticles = async () => {
    try {
      const randomStart = await fetchRandomArticle();
      const randomTarget = await fetchRandomArticle();
      setStartArticle(randomStart);
      setTargetArticle(randomTarget);
      setCurrentArticle(randomStart);
      setPath([randomStart.title]);
    } catch (error) {
      console.error("Error fetching random articles:", error);
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

  return (
    <div className="App">
      <h1>Wiki Race Game</h1>
      {startArticle && targetArticle ? (
        <p>
          Navigate from <strong>{startArticle.title}</strong> to{" "}
          <strong>{targetArticle.title}</strong>
        </p>
      ) : (
        <div>Loading...</div>
      )}
      {currentArticle && <Article links={currentArticle.links} />}
    </div>
  );
}

export default App;
