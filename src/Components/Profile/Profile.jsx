import React, { useEffect, useState } from "react";
import AuthContext from "../AuthContext";
import Post from "../Post/Post";

function Profile(props) {
  const { setCurrentPage } = React.useContext(AuthContext);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const userProfileImage = JSON.parse(localStorage.getItem("userProfileImage"));

  const [profileSection, setProfileSection] = useState(0);

  return (
    <div className="min-h-screen w-full relative z-0">
      <div className="min-h-fit w-full p-3">
        <div className="bg-black w-full min-h-fit h-32 relative">
          <div
            onClick={() => {
              setCurrentPage(3);
            }}
            className="w-full flex justify-end text-2xl p-2 text-white"
          >
            <i className="fa-solid fa-ellipsis"></i>
          </div>

          <div
            className="bg-white flex min-h-fit w-20 h-20 rounded-full absolute -bottom-10 left-5 flex-wrap hover:cursor-pointer"
            onClick={() => {
              setCurrentPage(5);
            }}
          >
            {/* If image display image if not display add image */}
            <div className="w-full h-full flex flex-wrap justify-center items-center ">
              {userProfileImage && (
                <img
                  className=" w-20 h-20 rounded-full object-cover"
                  src={userProfileImage}
                  alt=""
                />
              )}

              {/* <i className="fa-solid fa-image text-2xl font-bold w-full text-center text-gray-500"></i> */}
            </div>
            {/* User Name and Users Name */}
            <h1 className="mt-1 text-2xl font-bold text-dark-text w-full">
              {/* {nameString} */}
            </h1>
            <h1 className="text-md text-gray-400 w-full whitespace-nowrap">
              {"@" + userData.username}
              <div>{userData.fName + " " + userData.lName}</div>
            </h1>
          </div>
        </div>

        {/* Profile Nav */}
        <div className="w-full mt-24">
          <ul className="flex w-full justify-center text-white">
            <li
              onClick={() => {
                setProfileSection(0);
              }}
              className={
                profileSection === 0
                  ? "px-4 py-2 border-b-dark-accent-1 border-b-2"
                  : "px-4 py-2"
              }
            >
              Media
            </li>
            <li
              onClick={() => {
                setProfileSection(1);
              }}
              className={
                profileSection === 1
                  ? "px-4 py-2 border-b-dark-accent-1 border-b-2"
                  : "px-4 py-2"
              }
            >
              Your Likes
            </li>
            <li
              onClick={() => {
                setProfileSection(2);
              }}
              className={
                profileSection === 2
                  ? "px-4 py-2 border-b-dark-accent-1 border-b-2"
                  : "px-4 py-2"
              }
            >
              Reposts
            </li>
          </ul>
        </div>

        {/* Media Section */}
        {profileSection === 0 && <Post route="getUserPosts" />}

        {/* Liked Posts Section */}
        {profileSection === 1 && <Post route="getUserLikedPosts" />}

        {/* Reposts Section */}
        {profileSection === 2 && <Post route="getUserReposts" />}
      </div>
    </div>
    // </div>
  );
}

export default Profile;
