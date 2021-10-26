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

export const handleListClick = (event, setAlgo) => {
  const algoList = document.querySelector(".algo-list");
  algoList.classList.toggle("show-menu");
  setAlgo(event.target.innerText);
};

export const getNodeObject = (row, col, state) => {
  let nodeObj = state.nodes.filter(
    (node) => node.row === row && node.col === col
  );
  return nodeObj[0];
};
