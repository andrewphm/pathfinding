import React from "react";

// Utility
import {
  handleMouseDown,
  handleMouseEnter,
  handleMouseLeave,
  handleMouseUp,
  getGridSize,
  getNodeObject,
} from "../../utility";

// Algorithms
import { bfs, dfs } from "../../algorithms";

const Grid = ({ state, dispatch }) => {
  let algorithmObj = {
    algorithms: [bfs, dfs],
    getGridSize: getGridSize,
    getNodeObject: getNodeObject,
  };

  const algorithmDescription = (algo) => {
    if (algo === "Breadth-first Search") {
      return (
        <p>
          Breath-first Search is <strong>unweighted</strong> and
          <strong> guarantees </strong>the shortest path!
        </p>
      );
    }
  };

  return (
    <section
      onClick={() => {
        console.log("firing");
        let list = document.getElementById("algo-list");
        if (list.classList.contains("show-menu"))
          list.classList.remove("show-menu");
      }}
      className="grid-container"
    >
      <div className="algo-description">{algorithmDescription(state.algo)}</div>
      <div className="legend-container">
        <ul className="legend">
          <li>
            <div className="start-node"></div>
            <p> Start Node</p>
          </li>
          <li>
            <div className="target-node"></div>
            <p> Target Node</p>
          </li>
          <li>
            <div className="unvisited-node"></div>
            <p> Unvisited Nodes</p>
          </li>
          <li>
            <div className="visited-node"></div>
            <p> Visited Nodes</p>
          </li>
          <li>
            <div className="shortest-path"></div>
            <p> Shortest Path</p>
          </li>
          <li>
            <div className="wall-node"></div>
            <p> Wall Nodes</p>
          </li>
        </ul>
      </div>

      <div
        id="grid"
        onMouseDown={(event) => {
          handleMouseDown(event.target, dispatch);
        }}
        onMouseOver={(event) => {
          handleMouseEnter(event.target, state, dispatch, algorithmObj);
        }}
        onMouseUp={(event) => handleMouseUp(event.target, dispatch, state)}
      >
        {state.nodes.map((e, index) => {
          const { row, col } = e;
          let className = "";
          if (index === state.startNodeIndex) {
            className = "start";
            return (
              <div
                onMouseLeave={(e) => handleMouseLeave(e, state)}
                id={`node-${row}-${col}`}
                key={index}
                className={`grid-item ${className}`}
              ></div>
            );
          }
          if (index === state.targetNodeIndex) {
            className = "target";
            return (
              <div
                onMouseLeave={(e) => handleMouseLeave(e, state)}
                id={`node-${row}-${col}`}
                key={index}
                className={`grid-item ${className}`}
              ></div>
            );
          }
          return (
            <div
              onMouseLeave={(e) => handleMouseLeave(e, state)}
              id={`node-${row}-${col}`}
              key={index}
              className={`grid-item`}
            ></div>
          );
        })}
      </div>
    </section>
  );
};

export default Grid;
