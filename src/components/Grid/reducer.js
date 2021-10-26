export const reducer = (state, action) => {
  if (action.type === "MOUSEDOWN") {
    console.log("reducer firing");
    state.isMouseDown = true;
    return state;
  }
  if (action.type === "MOUSEUP") {
    console.log("reducer firing");
    state.isMouseDown = false;
    return state;
  }
  if (action.type === "IS_RUNNING") {
    console.log("reducer firing");
    state.isRunning = action.payload;
    console.log(state);
    return state;
  }
};
