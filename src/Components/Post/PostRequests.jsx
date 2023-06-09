// Separate module for post requests

import axios from "axios";

function updateLikes(postId, updatedLikes, userId) {
  // Send the Axios POST request to update post settings for likes
  const url =
    window.location.hostname === "localhost"
      ? "http://localhost:8080/updateLikes"
      : "https://gilliamsserver.herokuapp.com/updateLikes";

  return axios.post(url, {
    postId: postId,
    likes: updatedLikes,
    user: userId,
  });
}

function updateReposts(postId, updatedReposts, userId) {
  // Send the Axios POST request to update post settings for reposts
  const url =
    window.location.hostname === "localhost"
      ? "http://localhost:8080/updateReposts"
      : "https://gilliamsserver.herokuapp.com/supdateReposts";

  return axios.post(url, {
    postId: postId,
    reposts: updatedReposts,
    user: userId,
  });
}

export { updateLikes, updateReposts };
