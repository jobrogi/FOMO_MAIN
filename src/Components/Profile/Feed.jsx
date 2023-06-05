import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../AuthContext";
import LikeButton from "../Post/LikeButton";
import WelcomeSignUp from "../SignUp/WelcomeSignUp";
import WelcomeSignIn from "../SignIn/WelcomeSignIn";
import serverRequest from "../Requests";
function Feed() {
  const [posts, setPosts] = useState([]);
  const [repostedPosts] = useState([]);
  const { isAuthenticated } = useContext(AuthContext);

  // Made a new component just for making the axios.get requests
  useEffect(() => {
    serverRequest({
      route: "getFeed",
      headers: { "Content-Type": "application/json" },
      method: "get",
    })
      .then((response) => {
        // console.log(response.data);
        setPosts(response.data);
      })
      .catch((err) => {
        console.log("err! " + err);
      });
  }, []);

  return (
    <div className="flex w-full">
      <div
        className={
          !isAuthenticated
            ? "p-2 flex flex-wrap w-fit sm:w-3/4 md:w-11/12 lg:w-4/6"
            : "p-2 flex flex-wrap sm:w-3/4 md:w-11/12 lg:w-11/12"
        }
      >
        {posts
          .slice()
          .reverse()
          .map((post) => (
            <div
              className={
                !isAuthenticated
                  ? "mt-5 sm:ms-32 w-full flex"
                  : "mt-5 justify-center w-full flex"
              }
              key={post._id}
            >
              {/* IF user not logged in show this:  */}
              <div className="flex justify-start ">
                {/* PROFILE IMAGE*/}
                <div className="h-full pe-2">
                  <div className="w-12 h-12 bg-black rounded-full">
                    {post.user.profileImage != "null" ? (
                      <img
                        className="w-12 h-12 rounded-full object-cover"
                        src={post.user.profileImage}
                        alt="User Profile Picture"
                      />
                    ) : (
                      <div className="text-white w-12 h-12 rounded-full flex justify-center items-center">
                        <i className="text-xl fa-solid fa-user"></i>
                      </div>
                    )}
                  </div>
                </div>

                <div className="w-full text-white">
                  {/* USERNAME / NAME */}
                  <div className="flex">
                    <h1 className="whitespace-nowrap font-bold">
                      {console.log(post)}
                      {post.user.fName + " " + post.user.lName}
                    </h1>
                    <h1 className="text-gray-400">@{post.user.username}</h1>
                  </div>

                  {/* DESC */}
                  <h1 className="text-sm mb-2">
                    This is my description of my post! Testing for length now!
                  </h1>
                  {/* Post Image */}
                  <div className="flex items-center min-w-230">
                    <div className="max-w-500 border-white">
                      <img
                        className="w-full md:w-500 h-full rounded object-cover"
                        src={post.imageData}
                        alt=" POSTED"
                      />
                    </div>
                  </div>

                  {/* Interactions / Like Button / Repost Button */}
                  <div className="w-full ">
                    <ul className="flex">
                      <LikeButton
                        postId={post._id}
                        initialLikes={post.likes || 0}
                      />

                      <li
                        onClick={() => {
                          // togglePostSettings(post._id, 1);
                        }}
                        className={`px-2 ${
                          repostedPosts.includes(post._id)
                            ? "text-blue-500"
                            : ""
                        }`}
                      >
                        <i className="fa-solid fa-retweet me-1"></i>{" "}
                        {post.reposts && post.reposts ? post.reposts : 0}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      {!isAuthenticated && (
        <div className="hidden lg:flex lg:h-fit lg:flex-wrap lg:w-2/6 lg:p-5 mt-5">
          <WelcomeSignUp />
          <WelcomeSignIn />
        </div>
      )}
    </div>
  );
}

export default Feed;
