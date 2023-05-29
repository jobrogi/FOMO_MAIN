import React, { useState } from "react";

function ImageHandler({ onImageSubmit }) {
  const [dragOver, setDragOver] = useState(false);
  const [imageSrc, setImageSrc] = useState("");

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragOver(false);
    const file = event.dataTransfer.files[0];
    handleImage(file);
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    handleImage(file);
  };

  const handleImage = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const imageData = event.target.result;
      setImageSrc(imageData); // Update the image source with imageData
      // Call the onImageSubmit callback function provided by the parent component
      onImageSubmit(file, imageData);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div
      className={`border-2 border-dashed border-gray-400 rounded-lg ${
        dragOver ? "border-blue-500" : ""
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="mb-4">
        <img
          src={imageSrc}
          alt="Drag Drop"
          className={`mx-auto h-32 ${imageSrc ? "" : "hidden"}`}
        />
      </div>
      <div className="text-sm text-white text-center p-2 pb-4">
        <p className="text-dark-text">Drag and drop an image here</p>
        <p className="mt-1 text-gray-500">or</p>
        <p className="mt-1">
          <input
            type="file"
            name="file"
            id="fileInput"
            className="hidden"
            accept="image/*"
            onChange={handleFileInputChange}
          />
          <label htmlFor="fileInput" className="cursor-pointer text-blue-500">
            Select an image
          </label>
        </p>
      </div>
    </div>
  );
}

export default ImageHandler;
