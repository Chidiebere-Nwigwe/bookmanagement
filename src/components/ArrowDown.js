import React from "react";

const ArrowDown = () => {
  const container = document.querySelector(".AdminBookContainer");
  //scroll down depending on what is showing on page
  const moveDown = () => {
    {
      container
        ? container.scrollTo({
            top: container.scrollHeight,
            behavior: "smooth",
          })
        : window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
          });
    }
  };

  return (
    <button
      onClick={moveDown}
      style={{
        position: "fixed",
        bottom: "20px",
        left: "20px",
        padding: "10px",
        backgroundColor: "#087698",
        color: "#fff",
        borderRadius: "50%",
        border: "none",
        fontSize: "30px",
        cursor: "pointer",
      }}
    >
      ↓
    </button>
  );
};

export default ArrowDown;
