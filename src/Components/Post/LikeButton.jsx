import React, { useState } from "react";

const LikeButton = ({ postId, initialLikes }) => {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    if (liked) {
      // User has already liked the post, so remove the like
      setLikes((prevLikes) => prevLikes - 1);
      setLiked(false);
      localStorage.removeItem(`likedPost_${postId}`);

      // Perform the necessary API request to update the like count on the server
      // ...
    } else {
      // User has not liked the post, so add the like
      setLikes((prevLikes) => prevLikes + 1);
      setLiked(true);
      localStorage.setItem(`likedPost_${postId}`, true);

      // Perform the necessary API request to update the like count on the server
      // ...
    }
  };

  return (
    <li onClick={handleLike} className={`px-2 ${liked ? "text-red-500" : ""}`}>
      <i className="fa-solid fa-heart me-1"></i>
      {likes}
    </li>
  );
};

export default LikeButton;
