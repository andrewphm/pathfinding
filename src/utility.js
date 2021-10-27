// Clear walls
export const clearWalls = (row, col, state) => {
  if (!state.isRunning) {
    for (let x = 0; x < row; x++) {
      for (let y = 0; y < col; y++) {
        let node = document.getElementById(`node-${x}-${y}`);
        node.classList.remove("wall");
        node.classList.remove("visited");
      }
    }
  }
};

/* Mouse event handlers */
// Drawing walls
export const handleMouseDown = (target, dispatch) => {
  if (
    !target.classList.contains("target") &&
    !target.classList.contains("start")
  ) {
    dispatch({ type: "BUILDING_WALL", payload: true });
    target.classList.add("wall");
  }
  if (target.classList.contains("start"))
    dispatch({ type: "MOVING_START", payload: true });
  if (target.classList.contains("target"))
    dispatch({ type: "MOVING_TARGET", payload: true });
};

export const handleMouseUp = (dispatch, state) => {
  if (state.isMouseDown) dispatch({ type: "BUILDING_WALL", payload: false });
  if (state.isMovingStart) dispatch({ type: "MOVING_START", payload: false });
  if (state.isMovingTarget) dispatch({ type: "MOVING_TARGET", payload: false });
};
export const handleMouseEnter = (target, state) => {
  if (
    state.isMouseDown &&
    !target.classList.contains("target") &&
    !target.classList.contains("start") &&
    target !== document.getElementById("grid")
  )
    target.classList.add("wall");

  if (
    state.isMovingStart &&
    !target.classList.contains("target") &&
    !target.classList.contains("start") &&
    target !== document.getElementById("grid")
  )
    target.classList.add("start");

  if (
    state.isMovingTarget &&
    !target.classList.contains("target") &&
    !target.classList.contains("start") &&
    target !== document.getElementById("grid")
  )
    target.classList.add("target");
};
export const handleMouseLeave = (e, dispatch, state) => {
  if (state.isMovingStart) e.target.classList.remove("start");
  if (state.isMovingTarget) e.target.classList.remove("target");
};
// Show algorithm menu
export const handleListClick = (event, setAlgo) => {
  const algoList = document.querySelector(".algo-list");
  algoList.classList.toggle("show-menu");
  setAlgo(event.target.innerText);
};

// Dynamically grab grid size
export const getGridSize = () => {
  const grid = document.getElementById("grid");
  const styles = getComputedStyle(grid);
  const row = styles.gridTemplateRows.split(" ").length;
  const col = styles.gridTemplateColumns.split(" ").length;
  return [row, col];
};
