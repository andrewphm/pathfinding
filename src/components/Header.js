import React from "react";

const Header = () => {
  return (
    <header>
      <h1 className="title">Pathfinding Visualizer</h1>
      <div className="links">
        <a
          target="_blank"
          href="https://github.com/andrewphm/pathfinding"
          rel="noreferrer"
        >
          <i className="ri-github-fill ri-lg"></i>
        </a>
        <a target="_blank" href="https://andrewpham.ca" rel="noreferrer">
          <i className="ri-user-fill ri-lg"></i>
        </a>
      </div>
    </header>
  );
};

export default Header;
