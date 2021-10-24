import React, { useReducer, useEffect } from "react";

// Reducer
// import { reducer } from "../../utility/reducer";

const Grid = () => {
  // Set up state management for nodes

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

  const reducer = (state, action) => {
    if (action.type === "SET_TARGET") {
      console.log("reducer firing");
      console.log(state);
      let randNum = Math.floor(Math.random() * action.payload);
      console.log(randNum);
      let newState = state.filter((node, index) => index !== randNum);
      console.log(newState);
      return newState;
    }
  };

  const [state, dispatch] = useReducer(reducer, defaultState);

  useEffect(() => {
    let totalNodes = row * col;
    dispatch({ type: "SET_TARGET", payload: totalNodes });
    console.log("useEffect firing");
  }, []);

  return (
    <div id="container">
      {state.map((e, index) => {
        const { row, col, className } = e;
        return (
          <div
            key={index}
            className={`grid-item row-${row} col-${col} ${className}`}
          ></div>
        );
      })}
      {console.log("rendered")}
    </div>
  );
};

export default Grid;
