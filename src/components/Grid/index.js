import React, { useReducer } from "react";

// Reducer
// import { reducer } from "../../utility/reducer";

let row = 20;
let col = 20;

const Grid = () => {
  // Set up state management for nodes

  const initialGridArr = (row, col) => {
    const defaultState = { nodes: [], isMouseDown: false };
    for (let x = 0; x < row; x++) {
      for (let y = 0; y < col; y++) {
        const node = {
          row: x,
          col: y,
          isFilled: false,
          isStart: false,
          isTarget: false,
        };
        defaultState.nodes.push(node);
      }
    }

    defaultState.nodes[defaultState.nodes.length - 1].isTarget = true;
    defaultState.nodes[0].isStart = true;
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
    if (action.type === "MOUSEDOWN") {
      console.log("reducer firing");
      state.isMouseDown = true;
      console.log(state);
      return state;
    }
    if (action.type === "MOUSEUP") {
      console.log("reducer firing");
      state.isMouseDown = false;
      console.log(state);
      return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialGridArr(row, col));

  const handleMouseDown = (target) => {
    if (
      !target.classList.contains("target") &&
      !target.classList.contains("start")
    ) {
      dispatch({ type: "MOUSEDOWN" });
      target.classList.add("wall");
    }
  };

  const handleMouseEnter = (target) => {
    if (state.isMouseDown) {
      if (
        !target.classList.contains("target") &&
        !target.classList.contains("start")
      ) {
        target.classList.add("wall");
      }
    }
  };
  const handleMouseUp = (target) => {
    if (
      !target.classList.contains("target") &&
      !target.classList.contains("start")
    ) {
      dispatch({ type: "MOUSEUP" });
      target.classList.add("wall");
    }
  };

  return (
    <div
      id="container"
      onMouseDown={(event) => {
        handleMouseDown(event.target);
      }}
      onMouseOver={(event) => {
        handleMouseEnter(event.target);
        // console.log(event.target);
      }}
      onMouseUp={(event) => {
        handleMouseUp(event.target);
      }}
    >
      {console.log(state)}
      {state.nodes.map((e, index) => {
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
