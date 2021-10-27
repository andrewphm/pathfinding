import React from "react";

// Utility
import { handleListClick, clearWalls, getGridSize } from "../utility";

// Algorithms
import { dfs, bfs } from "../algorithms";

const Header = ({ algo, dispatch, state, row, col, setAlgo }) => {
  const getNodeObject = (row, col) => {
    let nodeObj = state.nodes.filter(
      (node) => node.row === row && node.col === col
    );
    return nodeObj[0];
  };

  const handleVirtualize = (algo) => {
    if (state.isRunning) return;
    switch (algo) {
      case "Depth-first search":
        dispatch({ type: "IS_RUNNING", payload: true });
        dfs(state, dispatch, getNodeObject, getGridSize);
        break;
      case "Breadth-first Search":
        dispatch({ type: "IS_RUNNING", payload: true });
        bfs(state, dispatch, getNodeObject, getGridSize);
        break;
      default:
        break;
    }
  };

  return (
    <header>
      <h1 className="title">Pathfinding Visualizer</h1>

      <div className="grid-buttons">
        <div className="algo-menu">
          <button
            className="btn"
            onClick={() => {
              const algoList = document.querySelector(".algo-list");
              algoList.classList.toggle("show-menu");
            }}
          >
            Choose Algorithm...{" "}
            <i className="ri-arrow-down-s-fill ri-lg algo-icon"></i>
          </button>
          <ul className="algo-list">
            <li onClick={(event) => handleListClick(event, setAlgo)}>
              Dijkstra's Algorithm
            </li>
            <li onClick={(event) => handleListClick(event, setAlgo)}>
              A* Search
            </li>
            <li onClick={(event) => handleListClick(event, setAlgo)}>
              Breadth-first Search
            </li>
            <li onClick={(event) => handleListClick(event, setAlgo)}>
              Depth-first search
            </li>
            <li onClick={(event) => handleListClick(event, setAlgo)}>
              Swarm Algoirthm
            </li>
          </ul>
        </div>
        <button
          onClick={() => handleVirtualize(algo)}
          className="btn visualize-btn"
        >
          Visualize {algo}!
        </button>
        <button
          className="clear-btn btn"
          onClick={() => {
            clearWalls(row, col, state);
          }}
        >
          Clear Walls
        </button>
      </div>

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
