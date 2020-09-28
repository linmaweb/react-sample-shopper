import React from "react";

const Title = ({ type }) => {
  return (
    <header className="header">
      <div className="container">
        <h1 className="title">React Sample Project: {type}</h1>
      </div>
    </header>
  );
};

export default Title;
