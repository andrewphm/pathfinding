import React, { useReducer, useEffect } from "react";

// Reducer
// import { reducer } from "../../utility/reducer";

let row = 20;
let col = 20;

const Grid = () => {
  // Set up state management for nodes

  const initialGridArr = (row, col) => {
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
    const randIndex = Math.floor(Math.random() * (row * col));
    const randIndex2 = Math.floor(Math.random() * (row * col));
    defaultState[defaultState.length - 1].isTarget = true;
    defaultState[0].isStart = true;
    return defaultState;
  };

  let root = document.getElementById("root");
  root.style.setProperty("--grid-rows", row);
  root.style.setProperty("--grid-columns", col);

  const reducer = (state, action) => {
    if (action.type === "SET_TARGET") {
      console.log("reducer firing");
      let randIndex = Math.floor(Math.random() * action.payload);
      state[randIndex].isTarget = true;
      console.log(state[randIndex]);
      return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialGridArr(row, col));

  const handleMouseDown = (target) => {
    if (
      !target.classList.contains("target") &&
      !target.classList.contains("start")
    ) {
      target.classList.add("wall");
    }
  };

  const handleMouseEnter = (target) => {};
  const handleMouseUp = (target) => {
    if (
      !target.classList.contains("target") &&
      !target.classList.contains("start")
    ) {
      target.classList.add("wall");
    }
  };

  return (
    <div
      id="container"
      onMouseDown={(event) => {
        handleMouseDown(event.target);
        console.log(event.target);
      }}
      onMouseEnter={(event) => {
        handleMouseEnter(event.target);
        console.log(event.target);
      }}
      onMouseUp={(event) => {
        handleMouseUp(event.target);
        console.log(event.target);
      }}
    >
      {state.map((e, index) => {
        const { row, col, isTarget, isStart } = e;
        let className = "";
        if (isTarget) {
          className = "target";
        } else if (isStart) {
          className = "start";
        }
        return (
          <div
            id={`node-${row}-${col}`}
            key={index}
            className={`grid-item ${className}`}
          ></div>
        );
      })}
      {console.log("rendered")}
    </div>
  );
};

export default Grid;
