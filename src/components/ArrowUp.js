import React from "react";

const ArrowUp = () => {
  const container = document.querySelector(".AdminBookContainer");
  //scroll up depending on what is showing on page
  const moveUp = () => {
    {
      container
        ? container.scrollTo({
            top: 0,
            behavior: "smooth",
          })
        : window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
    }
  };

  return (
    <button
      onClick={moveUp}
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        padding: "10px",
        backgroundColor: "#087698",
        color: "#fff",
        borderRadius: "50%",
        border: "none",
        fontSize: "30px",
        cursor: "pointer",
      }}
    >
      ↑
    </button>
  );
};

export default ArrowUp;
