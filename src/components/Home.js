import React, { useReducer, useState } from "react";

import Header from "./Header";
import Grid from "./Grid/";

import { reducer } from "./reducer";
const Home = () => {
  // Detect width
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const checkSize = () => {
    setWindowWidth(window.innerWidth);
  };
  window.addEventListener("resize", checkSize);

  let row = 0;
  let col = 0;
  let startIndex = 0;
  let targetIndex = 300;
  if (windowWidth > 1600) {
    row = 25;
    col = 50;
    startIndex = 305;
    targetIndex = 1043;
  } else if (windowWidth > 1080) {
    row = 20;
    col = 40;
    startIndex = 165;
    targetIndex = 672;
  } else if (windowWidth > 768) {
    row = 20;
    col = 30;
    startIndex = 124;
    targetIndex = 503;
  } else if (windowWidth > 320) {
    row = 25;
    col = 20;
    startIndex = 43;
    targetIndex = 435;
  }

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
      startNodeIndex: startIndex,
      targetNodeIndex: targetIndex,
      isMovingStart: false,
      isMovingTarget: false,
      isFinished: false,
      algo: "",
    };
    for (let x = 0; x < row; x++) {
      for (let y = 0; y < col; y++) {
        const node = {
          row: x,
          col: y,
          dom: null,
        };
        defaultState.nodes.push(node);
      }
    }
    return defaultState;
  };

  // Create useReducer hook to manage node/grid state. Set up state for algorithm chosen
  const [state, dispatch] = useReducer(reducer, initialGridArr(row, col));

  return (
    <>
      <Header state={state} row={row} col={col} dispatch={dispatch} />
      <Grid state={state} dispatch={dispatch} />
    </>
  );
};

export default Home;
