import React from "react";

export default ({
  width,
  height,
  events = true,
  margin = {
    top: 10,
    left: 50,
    right: 45,
    bottom: 20
  }
}) => {
  if (width < 10) return null;

  return (
    // some stuff
    <div>Hello</div>
  );
};
