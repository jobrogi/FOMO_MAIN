import React, { useEffect, useState } from "react";
import axios from "axios";
import PostDesc from "./PostDesc";

function Post(props) {
  // USER SIGNED IN HERE
  const userData = localStorage.getItem("userData");

  const [nameString, setNameString] = useState("");

  // POSTS GIVEN FROM SERVER END
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [repostedPosts, setRepostedPosts] = useState([]);
  const [myProfile, setMyProfile] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("userData");

    // console.log(userData);
    const { route } = props;

    let url;
    if (window.location.hostname === "localhost") {
      url = "http://localhost:8080" + route;
    } else {
      url = "https://pacific-citadel-02863.herokuapp.com" + route;
    }

    const requestData = {
      userData:
        route === "/getUserPosts" ||
        route === "/getUserLikedPosts" ||
        route === "/getUserReposts"
          ? JSON.parse(userData) // Parse the userData string back into an object
          : props.userData,
    };

    axios
      .post(url, requestData)
      .then((response) => {
        console.log("Response data:", response.data);
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const togglePostSettings = (postId, type) => {
    const postToUpdate = posts.find((post) => post._id === postId);

    // Like
    if (type === 0) {
      if (likedPosts.includes(postId)) {
        // User has already liked the post, so remove the like
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id === postId
              ? {
                  ...post,
                  likes: (post.likes || 0) - 1,
                }
              : post
          )
        );
        console.log("ONE");
        setLikedPosts((prevLikedPosts) =>
          prevLikedPosts.filter((id) => id !== postId)
        );
        localStorage.removeItem(`likedPost_${postId}`);

        // Calculate the updated total likes
        const updatedLikes = postToUpdate.likes ? postToUpdate.likes - 1 : 0;

        // Send the Axios POST request to update post settings
        let url;
        if (window.location.hostname === "localhost") {
          url = "http://localhost:8080/updateLikes";
        } else {
          url = "https://pacific-citadel-02863.herokuapp.com/updateLikes";
        }
        const parsedData = JSON.parse(userData);

        axios
          .post(url, {
            postId: postId,
            likes: updatedLikes,
            userId: parsedData.userId,
          }) // Include the postId and updatedLikes in the data payload
          .then((response) => {
            // Handle the response if needed
            console.log("Post settings updated successfully:", response.data);
          })
          .catch((error) => {
            // Handle the error
            console.error("Error updating post settings:", error);
          });
      } else {
        console.log("TWO");
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!" + userData);

        // User has not liked the post, so add the like
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id === postId
              ? {
                  ...post,
                  likes: (post.likes || 0) + 1,
                }
              : post
          )
        );

        // Calculate the updated total likes
        const updatedLikes = postToUpdate.likes ? postToUpdate.likes + 1 : 1;

        // Store the liked post ID in local storage
        localStorage.setItem(`likedPost_${postId}`, true);

        // Send the Axios POST request to update post settings
        let url;
        if (window.location.hostname === "localhost") {
          url = "http://localhost:8080/updateLikes";
        } else {
          url = "https://pacific-citadel-02863.herokuapp.com/updateLikes";
        }
        const parsedData = JSON.parse(userData);
        console.log(parsedData.userId);
        axios
          .post(url, {
            postId: postId,
            likes: updatedLikes,
            userId: parsedData.userId,
          }) // Include the postId and updatedLikes in the data payload
          .then((response) => {
            // Handle the response if needed
            console.log("Post settings updated successfully:", response.data);
          })
          .catch((error) => {
            // Handle the error
            console.error("Error updating post settings:", error);
          });

        setLikedPosts((prevLikedPosts) => [...prevLikedPosts, postId]);
      }
    }

    // Reposts
    if (type === 1) {
      if (repostedPosts.includes(postId)) {
        // User has already reposted the post, so remove the repost
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id === postId
              ? { ...post, reposts: (post.reposts || 0) - 1 }
              : post
          )
        );
        setRepostedPosts((prevRepostedPosts) =>
          prevRepostedPosts.filter((id) => id !== postId)
        );
        localStorage.removeItem(`repostedPost_${postId}`);

        // Calculate the updated total reposts
        const updatedReposts = postToUpdate.reposts
          ? postToUpdate.reposts - 1
          : 0;

        // Send the Axios POST request to update post settings for reposts
        const url =
          window.location.hostname === "localhost"
            ? "http://localhost:8080/updateReposts"
            : "https://pacific-citadel-02863.herokuapp.com/updateReposts";

        const parsedData = JSON.parse(userData);
        console.log(parsedData.userId);
        axios
          .post(url, {
            postId: postId,
            reposts: updatedReposts,
            userId: parsedData.userId,
          })
          .then((response) => {
            console.log("Post settings updated successfully:", response.data);
          })
          .catch((error) => {
            console.error("Error updating post settings:", error);
          });
      } else {
        // User has not reposted the post, so add the repost
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id === postId
              ? { ...post, reposts: (post.reposts || 0) + 1 }
              : post
          )
        );
        setRepostedPosts((prevRepostedPosts) => [...prevRepostedPosts, postId]);
        localStorage.setItem(`repostedPost_${postId}`, true);

        // Calculate the updated total reposts
        const updatedReposts = postToUpdate.reposts
          ? postToUpdate.reposts + 1
          : 1;

        // Send the Axios POST request to update post settings for reposts
        const url =
          window.location.hostname === "localhost"
            ? "http://localhost:8080/updateReposts"
            : "https://pacific-citadel-02863.herokuapp.com/updateReposts";
        const parsedData = JSON.parse(userData);

        axios
          .post(url, {
            postId: postId,
            reposts: updatedReposts,
            userId: parsedData.userId,
          })
          .then((response) => {
            console.log("Post settings updated successfully:", response.data);
          })
          .catch((error) => {
            console.error("Error updating post settings:", error);
          });
      }
    }
  };
  function handleDeletePost(postId) {
    let url;
    if (window.location.hostname === "localhost") {
      url = "http://localhost:8080/deletePost";
    } else {
      url = "https://pacific-citadel-02863.herokuapp.com/deletePost";
    }

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postId, username: userData.username }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data
        // Refresh the profile page.

        window.location.reload();

        console.log("Post deleted successfully:", data);
        // Update the posts state if needed
      })
      .catch((error) => {
        // Handle the error
        console.error("Error deleting post:", error);
      });
  }

  // Component initialization
  // Checks to see if you liked any of the posts so far.
  useEffect(() => {
    // Retrieve liked post IDs from local storage
    const likedPostKeys = Object.keys(localStorage).filter((key) =>
      key.startsWith("likedPost_")
    );
    const likedPostIds = likedPostKeys.map((key) =>
      key.replace("likedPost_", "")
    );
    setLikedPosts(likedPostIds);

    // Retrieve reposted post IDs from local storage
    const repostedPostKeys = Object.keys(localStorage).filter((key) =>
      key.startsWith("repostedPost_")
    );
    const repostedPostIds = repostedPostKeys.map((key) =>
      key.replace("repostedPost_", "")
    );
    setRepostedPosts(repostedPostIds);
  }, []);

  return (
    <div>
      {posts
        .slice()
        .reverse()
        .map((post) => (
          <div className="w-full flex flex-wrap my-5" key={post._id}>
            <div className="w-full flex flex-wrap my-5" key={post._id}>
              <div className="w-full min-h-fit h-fit flex flex-wrap relative">
                <div
                  className={
                    myProfile === true
                      ? "absolute -top-4 right-0 text-2xl p-2 text-dark-text"
                      : "hidden"
                  }
                >
                  <ul className="flex items-center">
                    <li className="px-2 text-gray-400">
                      <i className="fa-solid fa-ellipsis"></i>
                    </li>
                    <li
                      onClick={() => {
                        handleDeletePost(post._id);
                      }}
                      className="px-2 text-sm text-gray-400"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </li>
                  </ul>
                </div>
                <ul className="flex w-full h-fit mb-2">
                  <li className="">
                    <div className="w-10 h-10 rounded-full bg-white"></div>
                  </li>
                  <li className="ms-3 align-center">
                    <ul className="text-sm flex">
                      <li className="font-bold text-white">
                        {" "}
                        {post.user.fName + " " + post.user.lName}
                      </li>
                      <li className="ms-1 text-xs text-gray-400">
                        @{post.user.username}
                      </li>
                    </ul>
                    <div className="text-white whitespace-wrap">
                      <PostDesc fullText={post.postDesc} />
                    </div>
                  </li>
                </ul>
                {/* <div className="w-10 h-10 rounded-full bg-white"></div> */}
                <div className="flex w-full max-h-full justify-end">
                  <img
                    className="object-cover object-center max-h-full w-3/4"
                    src={post.imageData}
                    alt="Image"
                  />
                </div>
                <ul className="text-gray-400 flex w-full max-h-full mt-2 justify-end">
                  {/* Like Button */}
                  <li
                    onClick={() => {
                      togglePostSettings(post._id, 0);
                    }}
                    className={`px-2 ${
                      likedPosts.includes(post._id) ? "text-red-500" : ""
                    }`}
                  >
                    <i className="fa-solid fa-heart me-1"></i>
                    {post.likes && post.likes ? post.likes : 0}
                  </li>

                  {/* Repost Button */}
                  <li
                    onClick={() => {
                      togglePostSettings(post._id, 1);
                    }}
                    className={`px-2 ${
                      repostedPosts.includes(post._id) ? "text-blue-500" : ""
                    }`}
                  >
                    <i className="fa-solid fa-retweet me-1"></i>{" "}
                    {post.reposts && post.reposts ? post.reposts : 0}
                  </li>
                </ul>
              </div>
              {/* <hr className='bg-white w-full mt-3' /> */}
            </div>
          </div>
        ))}
    </div>
  );
}

export default Post;
