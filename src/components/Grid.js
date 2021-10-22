import React, { useReducer, useState } from "react";

// Reducer
import { reducer } from "../utility/reducer";

const defaultState = {
  nodes: [],
};

const Grid = () => {
  let row = 25;
  let col = 25;
  let root = document.getElementById("root");
  root.style.setProperty("--grid-rows", row);
  root.style.setProperty("--grid-columns", col);

  let grid = [];
  for (let x = 0; x < row; x++) {
    for (let y = 0; y < col; y++) {
      const cell = [x, y];
      grid.push(cell);
    }
  }
  console.log(grid);

  return (
    <div id="container">
      {grid.map((e, index) => {
        return (
          <div
            key={index}
            className={`grid-item row-${e[0]} col-${e[1]}`}
          ></div>
        );
      })}
    </div>
  );
};

export default Grid;
