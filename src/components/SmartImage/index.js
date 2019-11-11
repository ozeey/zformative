import React from "react";
import Img from "react-image";

const colors = ["FFFFFF", "F06B4F", "F2AE52", "B0CD6D", "A33120"];

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

const SmartImage = ({ src, ...rest }) => (
  <Img
    src={src}
    unloader={
      <img
        src={`https://via.placeholder.com/150/${randomColor(
          colors
        )}/808080?text=zformative`}
        alt="zformative"
      />
    }
    {...rest}
  />
);

export default SmartImage;
