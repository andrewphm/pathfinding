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
    dispatch({ type: "MOUSEDOWN" });
    target.classList.add("wall");
  }
};
export const handleMouseEnter = (target, state) => {
  if (state.isMouseDown) {
    if (
      !target.classList.contains("target") &&
      !target.classList.contains("start") &&
      target !== document.getElementById("grid")
    ) {
      target.classList.add("wall");
    }
  }
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
