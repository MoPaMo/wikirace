import React from "react";

function Article({ links, onLinkClick }) {
  return (
    <div className="article-container">
      <h2>Current Article Links:</h2>
      <div className="article-links">
        {links.map(
          (link, index) =>
            link.exists !== undefined && (
              <button key={index} onClick={() => onLinkClick(link["*"])}>
                {link["*"]}
              </button>
            )
        )}
      </div>
    </div>
  );
}

export default Article;
