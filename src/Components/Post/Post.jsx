import React, { useEffect, useState } from "react";
import PostDesc from "./PostDesc";
import serverRequest from "../Requests";

function Post(props) {
  // USER SIGNED IN HERE
  const userData = localStorage.getItem("userData");
  // POSTS GIVEN FROM SERVER END
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [repostedPosts, setRepostedPosts] = useState([]);
  const [myProfile, setMyProfile] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("userData");

    // console.log(userData);
    const { route } = props;

    const requestData = {
      userData:
        route === "getUserPosts" ||
        route === "getUserLikedPosts" ||
        route === "getUserReposts"
          ? JSON.parse(userData) // Parse the userData string back into an object
          : props.userData,
    };

    serverRequest({
      route: route,
      headers: { "Content-Type": "application/json" },
      method: "post",
      data: requestData,
    })
      .then((response) => {
        setPosts(response.data);
      })
      .catch((err) => {
        console.log("err! " + err);
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

        const parsedData = JSON.parse(userData);

        serverRequest({
          route: "updateLikes",
          headers: { "Content-Type": "application/json" },
          method: "post",
          data: {
            postId: postId,
            likes: updatedLikes,
            userId: parsedData.userId,
          },
        })
          .then((response) => {
            console.log("Post settings updated successfully:", response.data);
          })
          .catch((err) => {
            console.log("err! " + err);
          });
      } else {
        console.log("TWO");

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
        const parsedData = JSON.parse(userData);

        serverRequest({
          route: "updateLikes",
          headers: { "Content-Type": "application/json" },
          method: "post",
          data: {
            postId: postId,
            likes: updatedLikes,
            userId: parsedData.userId,
          },
        })
          .then((response) => {
            console.log("Post settings updated successfully:", response.data);
          })
          .catch((err) => {
            console.log("err! " + err);
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

        const parsedData = JSON.parse(userData);

        serverRequest({
          route: "updateReposts",
          headers: { "Content-Type": "application/json" },
          method: "post",
          data: {
            postId: postId,
            reposts: updatedReposts,
            userId: parsedData.userId,
          },
        })
          .then((response) => {
            console.log("Post settings updated successfully:", response.data);
          })
          .catch((err) => {
            console.log("err! " + err);
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

        const parsedData = JSON.parse(userData);

        serverRequest({
          route: "updateReposts",
          headers: { "Content-Type": "application/json" },
          method: "post",
          data: {
            postId: postId,
            reposts: updatedReposts,
            userId: parsedData.userId,
          },
        })
          .then((response) => {
            console.log("Post settings updated successfully:", response.data);
          })
          .catch((err) => {
            console.log("err! " + err);
          });
      }
    }
  };

  function handleDeletePost(postId) {
    const data = JSON.parse(userData);
    console.log(data.username);
    serverRequest({
      route: "deletePost",
      headers: { "Content-Type": "application/json" },
      method: "post",
      data: { postId, username: data.username },
    })
      .then((response) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log("err! " + err);
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
                    myProfile === false
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
                  <li className="ms-3 align-center w-full">
                    <ul className="text-sm flex">
                      <li className="font-bold text-white">
                        {" "}
                        {post.user.fName + " " + post.user.lName}
                      </li>
                      <li className="ms-1 text-xs text-gray-400">
                        @{post.user.username}
                      </li>
                    </ul>
                    <div className=" max-w-full text-white ">
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
