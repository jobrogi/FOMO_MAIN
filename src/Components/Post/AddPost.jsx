import React, { useState } from "react";
import ImageHandler from "./ImageUploader";
import AuthContext from "../AuthContext";
import ImageResizer from "react-image-file-resizer";
import serverRequest from "../Requests";

function AddPost() {
  const [imageData, setImageData] = useState("");
  const userData = JSON.parse(localStorage.getItem("userData"));
  const { setCurrentPage } = React.useContext(AuthContext);

  async function handlePost() {
    if (imageData != null) {
      if (imageData.base64Data !== "") {
        const { file } = imageData;
        const reader = new FileReader();
        reader.onloadend = async function () {
          const resizedImage = await new Promise((resolve) => {
            ImageResizer.imageFileResizer(
              file,
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

          sendPostData(resizedImage);
        };
        reader.readAsDataURL(file);
      } else {
        console.log("Image file missing");
      }
    }
    // Rest of the function code...
  }

  function sendPostData(base64Data) {
    const postDesc = document.getElementById("postDesc").value;

    serverRequest({
      route: "post",
      headers: { "Content-Type": "application/json" },
      method: "post",
      data: {
        username: userData.username,
        imageData: base64Data,
        postDesc: postDesc,
      },
    })
      .then((response) => {
        localStorage.setItem("currentPage", 1);
        window.location.reload();
        setCurrentPage(1);
      })
      .catch((err) => {
        console.log("err! " + err);
      });
  }

  const handleImageSubmission = (file, imageData) => {
    handleImage(file, imageData);
  };

  const handleImage = (file, imageData) => {
    const base64Data = imageData;
    setImageData({ file, base64Data });
  };

  return (
    // Purpose of this page is to add post to user account and also
    <div className="w-full min-h-screen mt-5">
      <h1 className="text-white text-2xl text-center">Create Post</h1>
      <div className=" p-4 m-5">
        <ImageHandler onImageSubmit={handleImageSubmission} />
      </div>

      <div className=" p-4 m-5 border text-center rounded flex flex-wrap justify-center">
        <p className="text-white w-full">Now Lets add a Post Description!</p>
        <textarea
          name="postDesc"
          id="postDesc"
          cols="30"
          rows="10"
          className="h-20 min-h-fit mt-3"
        ></textarea>
      </div>
      <button
        onClick={handlePost}
        className="px-4 py-2 bg-Green rounded text-white float-right me-5"
      >
        Post
      </button>
    </div>
  );
}

export default AddPost;
