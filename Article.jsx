import React from "react";

function Article({ links, onLinkClick }) {
  return (
    <div>
      <h2>Current Article Links:</h2>
      <ul>
        {links.map(
          (link, index) =>
            link.exists && (
              <li key={index}>
                <button onClick={() => onLinkClick(link.title)}>
                  {link.title}
                </button>
              </li>
            )
        )}
      </ul>
    </div>
  );
}

export default Article;
