import React, { useReducer, useState } from "react";

import Header from "./Header";
import Grid from "./Grid/";

import { reducer } from "./reducer";
const Home = () => {
  let row = 20;
  let col = 35;

  // Set properties of CSS variable grid row/col
  let root = document.getElementById("root");
  root.style.setProperty("--grid-rows", row);
  root.style.setProperty("--grid-columns", col);

  // Set up default state of nodes
  const initialGridArr = (row, col) => {
    const defaultState = {
      nodes: [],
      isMouseDown: false,
      isRunning: false,
      startNodeIndex: 75,
      targetNodeIndex: 590,
      isMovingStart: false,
      isMovingTarget: false,
    };
    for (let x = 0; x < row; x++) {
      for (let y = 0; y < col; y++) {
        const node = {
          row: x,
          col: y,
          parents: [],
          dom: null,
        };
        defaultState.nodes.push(node);
      }
    }
    return defaultState;
  };

  // Create useReducer hook to manage node/grid state. Set up state for algorithm chosen
  const [state, dispatch] = useReducer(reducer, initialGridArr(row, col));
  const [algo, setAlgo] = useState("");

  return (
    <>
      <Header
        state={state}
        setAlgo={setAlgo}
        algo={algo}
        row={row}
        col={col}
        dispatch={dispatch}
      />
      <Grid state={state} dispatch={dispatch} />
    </>
  );
};

export default Home;
