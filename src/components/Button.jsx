import React from "react";

export const Button = ({ setModal, getPdfs, letter }) => {
  return (
    <div className="letter-btn"
      onClick={() => {
        getPdfs(letter);
      }}
    >
      {letter}
    </div>
  );
};






