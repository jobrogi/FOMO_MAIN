import React, { useState } from "react";

function PostDescription({ fullText }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const truncatedText = fullText.slice(0, 100);
  const shouldTruncate = fullText.length > 100 && !isExpanded;

  return (
    <div>
      {shouldTruncate ? (
        <span>
          {truncatedText}...{" "}
          <button className="underline" onClick={toggleExpand}>
            Read more
          </button>
        </span>
      ) : (
        <span>
          {fullText}{" "}
          {isExpanded && (
            <button className="underline" onClick={toggleExpand}>
              Show less
            </button>
          )}
        </span>
      )}
    </div>
  );
}

export default PostDescription;
