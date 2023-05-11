import { useState, useEffect } from "react";

const ImageResizer = ({ src, width, height }) => {
  const [resizedSrc, setResizedSrc] = useState("");

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);
      setResizedSrc(canvas.toDataURL());
    };
    img.src = src;
  }, [src, width, height]);

  return <img src={resizedSrc} alt="Resized" />;
};

export default ImageResizer;