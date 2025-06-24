import React from "react";
import HashLoader from "react-spinners/HashLoader";

function Loader() {
  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 9999,
      }}
    >
      <HashLoader color="#008080" size={80} speedMultiplier={2} />
    </div>
  );
}

export default Loader;
