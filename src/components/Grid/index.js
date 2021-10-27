import React, { useState } from "react";

// Utility
import { handleMouseDown, handleMouseEnter } from "../../utility";

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
          const { row, col } = e;
          let className = "";
          if (index === 95) className = "start";
          if (index === 760) className = "target";
          return (
            <div
              id={`node-${row}-${col}`}
              key={index}
              className={`grid-item ${className}`}
            ></div>
          );
        })}
      </div>
      {console.log(`rendered`)}
    </section>
  );
};

export default Grid;
