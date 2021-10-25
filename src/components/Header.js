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
          <i class="fab fa-github fa-lg"></i>
        </a>
        <a target="_blank" href="https://andrewpham.ca" rel="noreferrer">
          <i class="fas fa-user-circle fa-lg"></i>
        </a>
      </div>
    </header>
  );
};

export default Header;
