import React, { useReducer, useState } from "react";

// Reducer
import { reducer } from "../../utility/reducer";

const Grid = () => {
  // Set up state management for nodes

  const reducer = (state, action) => {
    if (action.type === "ADD_NODE") {
      let newNodes = [...state.nodes, action.payload];

      return {
        ...state,
        nodes: newNodes,
      };
    }
  };

  let row = 25;
  let col = 25;
  let root = document.getElementById("root");
  root.style.setProperty("--grid-rows", row);
  root.style.setProperty("--grid-columns", col);

  const defaultState = [];
  for (let x = 0; x < row; x++) {
    for (let y = 0; y < col; y++) {
      const node = {
        row: x,
        col: y,
        isFilled: false,
        isStart: false,
        isTarget: false,
      };
      defaultState.push(node);
    }
  }

  const [state, dispatch] = useReducer(reducer, defaultState);
  console.log(state);

  return (
    <div id="container">
      {defaultState.map((e, index) => {
        const { row, col } = e;
        return (
          <div key={index} className={`grid-item row-${row} col-${col}`}></div>
        );
      })}
    </div>
  );
};

export default Grid;
