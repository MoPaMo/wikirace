import React from "react";

function Article({ links, onLinkClick }) {
    console.log(JSON.stringify(links));
  return (
    <div>
      <h2>Current Article Links:</h2>
      <ul>
        {links.map(
          (link, index) =>
            link.exists !== undefined && (
              <li key={index}>
                <button onClick={() => onLinkClick(link["*"])}>
                  {link["*"]}
                </button>
              </li>
            )
        )}
      </ul>
    </div>
  );
}

export default Article;
