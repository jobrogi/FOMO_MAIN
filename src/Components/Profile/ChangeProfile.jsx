import React, { useRef } from "react";

function ChangeProfile() {
  const fName = useRef(null);

  function SaveProfileChanges(e) {
    e.preventDefault();
    const inputValue = fName.current.value;
    console.log(inputValue);
    console.log("recieved");
    if (fName.current) {
      //   console.log(fName);
    }
  }
  const handleImage = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const imageData = event.target.result;
      console.log(imageData);
      //   setImageSrc(imageData); // Update the image source with imageData
      // Call the onImageSubmit callback function provided by the parent component
      //   onImageSubmit(file, imageData);
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    handleImage(file);
  };
  return (
    <div className="w-full min-h-screen">
      <h1 className="text-center text-2xl text-white mb-2">Profile</h1>
      <ul className="w-full h-fit justify-center px-2 align-baseline">
        <li className="flex w-full text-white">
          <div className="w-fit">
            <div className="w-16 h-16 rounded-full bg-white"></div>
          </div>
          <div className="ps-2 w-full max-w-full">
            <div>@Username</div>

            <input
              type="file"
              name="file"
              id="fileInput"
              className="hidden"
              accept="image/*"
              onChange={handleFileInputChange}
            />
            <label htmlFor="fileInput" className="cursor-pointer text-blue-500">
              Change Profile Imagea
            </label>
            <p>
              <textarea
                name="Profile Description"
                className="max-h-fit text-white bg-transparent"
                id=""
                cols="30"
                rows="5"
              ></textarea>
            </p>
          </div>
        </li>
        <li>
          {" "}
          <div className="w-full flex mt-2 ">
            <input
              type="text"
              placeholder="First Name"
              className="m-2 w-1/2 p-1 rounded"
              ref={fName}
            />
            <input
              type="text"
              placeholder="Last Name"
              className="m-2 w-1/2 p-1 rounded"
            />
          </div>
        </li>
        <button
          onClick={SaveProfileChanges}
          className="p-1 rounded text-white bg-Green float-right me-2 mt-2"
        >
          Save Changes
        </button>
      </ul>
    </div>
  );
}

export default ChangeProfile;
