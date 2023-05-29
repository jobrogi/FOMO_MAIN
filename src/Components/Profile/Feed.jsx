import React, { useEffect, useState } from "react";
import AuthContext from "../AuthContext";
import axios from "axios";
import PostDesc from "../Post/PostDesc";
import LikeButton from "../Post/LikeButton";
function Feed() {
  const [posts, setPosts] = useState([]);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [likedPosts, setLikedPosts] = useState([]);
  const [repostedPosts, setRepostedPosts] = useState([]);
  const { setCurrentPage, setCurrentRoute } = React.useContext(AuthContext);

  useEffect(() => {
    // const userData = localStorage.getItem("userData");

    let url;
    if (window.location.hostname === "localhost") {
      url = "http://localhost:8080/getFeed";
    } else {
      url = "https://pacific-citadel-02863.herokuapp.com/getFeed";
    }

    axios
      .get(url, {}) // Include the postId and updatedLikes in the data payload
      .then((response) => {
        // Handle the response if needed
        console.log(response.data);
        setPosts(response.data);
      })
      .catch((error) => {
        // Handle the error
        console.error("Error updating post settings:", error);
      });
  }, []);
  const [active, setActive] = useState(true);

  function setActiveButton(e) {
    setActive(e.target.value);
  }

  return (
    <div className="p-2">
      <ul className="flex flex-nowrap justify-center ">
        <li
          onClick={setActiveButton}
          value={0}
          className={
            active === 0
              ? "text-xl text-white transition-all duration-200 mx-10"
              : "text-white text-lg transition-all duration-200 mx-8"
          }
        >
          Following
        </li>

        {/* <li className="text-white">Following</li> */}
        <li
          onClick={setActiveButton}
          value={1}
          className={
            active === 1
              ? "text-xl text-white transition-all duration-200 mx-10"
              : "text-white text-lg transition-all duration-200 mx-8"
          }
        >
          For You
        </li>
      </ul>
      {posts
        .slice()
        .reverse()
        .map((post) => (
          <div className="w-full flex flex-wrap my-5" key={post._id}>
            <div className="w-full flex flex-wrap my-5" key={post._id}>
              <div className="w-full min-h-fit h-fit flex flex-wrap relative">
                <div className="absolute -top-4 right-0 text-2xl p-2 text-dark-text">
                  {/* Only show if the user logged in made this post */}

                  <ul className="flex items-center">
                    {/* <li className="px-2 text-gray-400">
                      <i className="fa-solid fa-ellipsis"></i>
                    </li> */}
                    {/* <li
                      onClick={() => {
                        // handleDeletePost(post._id);
                      }}
                      className="px-2 text-sm text-gray-400"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </li> */}
                  </ul>
                </div>

                <ul className="flex w-full h-fit mb-2">
                  <li className="">
                    <div className="w-10 h-10 rounded-full bg-white"></div>
                  </li>
                  <li className="ms-3 align-center">
                    <ul className="text-sm flex">
                      {/* <li className="font-bold text-white">{nameString}</li> */}
                      <li
                        className="ms-1 text-xs text-gray-400"
                        onClick={() => {
                          setCurrentRoute(post.user);
                          setCurrentPage(4);
                        }}
                      >
                        @{post.user.username}
                        <div className="w-full">
                          {post.user.fName + " " + post.user.lName}
                        </div>
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
                  <LikeButton
                    postId={post._id}
                    initialLikes={post.likes || 0}
                  />

                  {/* Repost Button */}
                  <li
                    onClick={() => {
                      // togglePostSettings(post._id, 1);
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
      {/* Card */}\{" "}
    </div>
  );
}

export default Feed;
