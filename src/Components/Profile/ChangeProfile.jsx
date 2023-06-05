import React, { useState, useRef } from "react";
import ImageResizer from "react-image-file-resizer";
import AuthContext from "../AuthContext";
import serverRequest from "../Requests";

// const userData = JSON.parse(localStorage.getItem("userData") || "{}");
const userData = localStorage.getItem("userData");

function ChangeProfile() {
  const [profilePicture, setProfilePicture] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const { setCurrentPage } = React.useContext(AuthContext);

  const fName = useRef(null);
  const lName = useRef(null);
  const profileDesc = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewURL(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const inputFName = fName.current.value;
    const inputLName = lName.current.value;
    const inputDesc = profileDesc.current.value;
    const inputImage = profilePicture;

    const resizedImage = await new Promise((resolve) => {
      ImageResizer.imageFileResizer(
        inputImage,
        500,
        500,
        "JPEG",
        10,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64"
      );
    });

    const data = JSON.parse(userData);
    serverRequest({
      route: "changeUserData",
      headers: { "Content-Type": "application/json" },
      method: "post",
      data: {
        fName: inputFName,
        lName: inputLName,
        profileDesc: inputDesc,
        profileImage: resizedImage,
        data: data,
      },
    })
      .then((response) => {
        const updatedUserData = {
          fName: inputFName,
          lName: inputLName,
          email: response.data.user.email,
          username: response.data.user.username,
          userId: data.userId,
        };
        const userProfileImage = response.data.user.profileImage;
        localStorage.setItem(
          "userProfileImage",
          JSON.stringify(userProfileImage)
        );
        setCurrentPage(1);
      })
      .catch((err) => {
        console.log("err! " + err);
      });
  };

  return (
    <form onSubmit={handleFormSubmit} className="max-w-md mx-auto">
      <div className="mb-4">
        <div className="w-full flex items-center">
          <div className="me-2">
            {previewURL && (
              <img className="w-16 h-16 rounded-full" src={previewURL} alt="" />
            )}
          </div>
          <div className="">
            <label
              className="block mb-2 font-bold text-white"
              htmlFor="profilePicture"
            >
              Profile Picture
            </label>
            <input
              type="file"
              id="profilePicture"
              onChange={handleImageChange}
              className="border w-full border-gray-300 text-white p-2 rounded-md"
            />
          </div>
        </div>
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-bold text-white" htmlFor="fName">
          First Name
        </label>
        <input
          type="text"
          id="fName"
          ref={fName}
          className="border border-gray-300 p-2 rounded-md w-full"
          placeholder={userData.fName}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-bold text-white" htmlFor="lName">
          Last Name
        </label>
        <input
          type="text"
          id="lName"
          ref={lName}
          className="border border-gray-300 p-2 rounded-md w-full"
          placeholder={userData.lName}
        />
      </div>
      <div className="mb-4">
        <label
          className="block mb-2 font-bold text-white"
          htmlFor="profileDesc"
        >
          Profile Description
        </label>
        <textarea
          id="profileDesc"
          ref={profileDesc}
          className="border border-gray-300 p-2 rounded-md w-full"
        ></textarea>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
      >
        Save Changes
      </button>
    </form>
  );
}

export default ChangeProfile;
