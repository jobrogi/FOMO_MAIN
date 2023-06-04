import React, { useState } from "react";

function PostDescription({ fullText }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const truncatedText = fullText.slice(0, 100);
  const shouldTruncate = fullText.length > 100 && !isExpanded;

  return (
    <div className="whitespace-normal max-w-full">
      {shouldTruncate ? (
        <span>
          {truncatedText}...{" "}
          <button className="underline" onClick={toggleExpand}>
            Read more
          </button>
        </span>
      ) : (
        <span className="max-w-full">
          {fullText}
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
