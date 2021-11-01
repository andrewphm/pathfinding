import React from "react";

// Utility
import {
  handleListClick,
  clearWalls,
  getGridSize,
  getNodeObject,
  clearPath,
} from "../utility";

// Algorithms
import { dfs, bfs } from "../algorithms";

const Header = ({ dispatch, state, row, col }) => {
  const handleVirtualize = (state) => {
    if (state.isRunning) return;
    switch (state.algo) {
      case "Depth-first Search":
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
      <div className="title-icon">
        <div className="icon"></div>
        <a href="http://andrewpham.ca/pathfinding">
          <h1 className="title">Pathfinding Visualizer</h1>
        </a>
      </div>

      <ul className="grid-buttons">
        <li className="algo-menu">
          <button
            href="#"
            className="choose-algo"
            onClick={() => {
              const algoList = document.querySelector(".algo-list");
              algoList.classList.toggle("show-menu");
            }}
          >
            <strong>Algorithms</strong>{" "}
            <i className="ri-arrow-down-s-fill ri-lg algo-icon"></i>
          </button>
          <ul id="algo-list" className="algo-list">
            <li onClick={(event) => handleListClick(event, dispatch, state)}>
              Breadth-first Search
            </li>
            <li onClick={(event) => handleListClick(event, dispatch, state)}>
              Depth-first Search
            </li>
            <li onClick={(event) => handleListClick(event, dispatch, state)}>
              Dijkstra's Algorithm
            </li>
            <li onClick={(event) => handleListClick(event, dispatch, state)}>
              A* Search
            </li>
            <li onClick={(event) => handleListClick(event, dispatch, state)}>
              Swarm Algoirthm
            </li>
          </ul>
        </li>
        <li>
          <button
            onClick={() => handleVirtualize(state, dispatch)}
            className="btn visualize-btn"
          >
            Visualize {state.algo}!
          </button>
        </li>
        <li>
          <button
            className="clear-btn btn"
            onClick={() => {
              clearWalls(row, col, dispatch);
            }}
          >
            Clear Walls
          </button>
        </li>
        <li>
          <button
            className="clear-path-btn btn"
            onClick={() => {
              clearPath(row, col, dispatch);
            }}
          >
            Clear Path
          </button>
        </li>
      </ul>
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
