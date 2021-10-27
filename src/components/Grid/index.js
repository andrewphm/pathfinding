import React from "react";

// Utility
import { handleMouseDown, handleMouseEnter } from "../../utility";

const Grid = ({ state, dispatch }) => {
  return (
    <section className="grid-container">
      <div className="legend-container">
        <ul className="legend">
          <li>
            <i className={`ri-arrow-right-s-line ri-lg start`}></i>
            <p> Start Node</p>
          </li>
          <li>
            <i className={`ri-focus-2-line ri-lg target`}></i>
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
          // console.log(event.target);
        }}
        onMouseUp={() => dispatch({ type: "MOUSEUP" })}
        onMouseLeave={() => {
          if (state.isMouseDown) {
            dispatch({ type: "MOUSEUP" });
          }
        }}
      >
        {state.nodes.map((e, index) => {
          const { row, col, isTarget, isStart } = e;
          let className = "";
          if (isTarget) {
            className = "target";
            return (
              <div
                id={`node-${row}-${col}`}
                key={index}
                className={`grid-item ${className}`}
              >
                <i className={`ri-focus-2-line ri-lg ${className}`}></i>
              </div>
            );
          } else if (isStart) {
            className = "start";
            return (
              <div
                id={`node-${row}-${col}`}
                key={index}
                className={`grid-item ${className}`}
              >
                <i className={`ri-arrow-right-s-line ri-lg ${className}`}></i>
              </div>
            );
          }
          return (
            <div
              id={`node-${row}-${col}`}
              key={index}
              className={`grid-item ${className}`}
            ></div>
          );
        })}
      </div>
    </section>
  );
};

export default Grid;
