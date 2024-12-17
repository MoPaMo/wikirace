import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [startArticle, setStartArticle] = useState(null);
  const [targetArticle, setTargetArticle] = useState(null);
  const [currentArticle, setCurrentArticle] = useState(null);
  const [path, setPath] = useState([]);

  useEffect(() => {}, []);

  return (
    <div className="App">
      <h1>Wiki Race Game</h1>
    </div>
  );
}

export default App;
