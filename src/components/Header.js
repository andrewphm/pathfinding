import React from "react";

import { clearWalls } from "./Grid/index";

const Header = () => {
  return (
    <header>
      <h1 className="title">Pathfinding Visualizer</h1>
      <nav>
        <button className="btn">Visualize!</button>
        <button
          onClick={() => {
            clearWalls(20, 20);
          }}
          className="btn"
        >
          Remove Walls
        </button>
      </nav>
    </header>
  );
};

export default Header;
