import React from "react";

// Utility
import {
  handleMouseDown,
  handleMouseEnter,
  handleMouseLeave,
  handleMouseUp,
} from "../../utility";

const Grid = ({ state, dispatch }) => {
  return (
    <section className="grid-container">
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
            <p> Wall nodes</p>
          </li>
        </ul>
      </div>

      <div
        id="grid"
        onMouseDown={(event) => {
          handleMouseDown(event.target, dispatch);
        }}
        onMouseOver={(event) => {
          handleMouseEnter(event.target, state);
        }}
        onMouseUp={() => handleMouseUp(dispatch, state)}
      >
        {state.nodes.map((e, index) => {
          const { row, col } = e;
          let className = "";
          if (index === state.startNodeIndex) {
            className = "start";
            return (
              <div
                onMouseLeave={(e) => handleMouseLeave(e, dispatch, state)}
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
                onMouseLeave={(e) => handleMouseLeave(e, dispatch, state)}
                id={`node-${row}-${col}`}
                key={index}
                className={`grid-item ${className}`}
              ></div>
            );
          }
          return (
            <div
              onMouseLeave={(e) => handleMouseLeave(e, dispatch, state)}
              id={`node-${row}-${col}`}
              key={index}
              className={`grid-item`}
            ></div>
          );
        })}
      </div>
      {console.log(`rendered`)}
    </section>
  );
};

export default Grid;
