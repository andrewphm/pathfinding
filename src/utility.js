// Clear walls
export const clearWalls = (row, col, dispatch) => {
  dispatch({ type: "IS_FINISHED", payload: false });
  for (let x = 0; x < row; x++) {
    for (let y = 0; y < col; y++) {
      let node = document.getElementById(`node-${x}-${y}`);
      node.classList.remove("wall");
    }
  }
};
export const clearPath = (row, col, dispatch) => {
  dispatch({ type: "IS_FINISHED", payload: false });
  for (let x = 0; x < row; x++) {
    for (let y = 0; y < col; y++) {
      let node = document.getElementById(`node-${x}-${y}`);
      node.classList.remove("visited");
      node.classList.remove("queue");
      node.classList.remove("shortest");
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
  if (target.classList.contains("start")) {
    dispatch({ type: "MOVING_START", payload: true });
  }
  if (target.classList.contains("target"))
    dispatch({ type: "MOVING_TARGET", payload: true });
};

export const handleMouseUp = (dispatch, state) => {
  if (state.isMouseDown) dispatch({ type: "BUILDING_WALL", payload: false });
  if (state.isMovingStart) dispatch({ type: "MOVING_START", payload: false });
  if (state.isMovingTarget) dispatch({ type: "MOVING_TARGET", payload: false });
};

export const handleMouseEnter = (target, state, dispatch, algorithmObj) => {
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
  ) {
    target.classList.add("start");
    const index = getIndexOf(target);
    dispatch({ type: "ASSIGN_START", payload: index });

    if (state.isFinished) {
      let instant = true;
      let { getGridSize, getNodeObject } = algorithmObj;
      let [bfs, dfs] = algorithmObj.algorithms;
      if (state.algo === "Breadth-first Search") {
        bfs(state, dispatch, getNodeObject, getGridSize, instant);
      }
      if (state.algo === "Depth-first Search") {
        dfs(state, dispatch, getNodeObject, getGridSize, instant);
      }
    }
  }

  if (
    state.isMovingTarget &&
    !target.classList.contains("target") &&
    !target.classList.contains("start") &&
    target !== document.getElementById("grid")
  ) {
    target.classList.add("target");
    const index = getIndexOf(target);
    dispatch({ type: "ASSIGN_TARGET", payload: index });

    if (state.isFinished) {
      let instant = true;
      let { getGridSize, getNodeObject } = algorithmObj;
      let [bfs, dfs] = algorithmObj.algorithms;
      if (state.algo === "Breadth-first Search") {
        bfs(state, dispatch, getNodeObject, getGridSize, instant);
      }
      if (state.algo === "Depth-first Search") {
        dfs(state, dispatch, getNodeObject, getGridSize, instant);
      }
    }
  }
};

export const handleMouseLeave = (e, state) => {
  if (state.isMovingStart) e.target.classList.remove("start");
  if (state.isMovingTarget) e.target.classList.remove("target");
};

// Show algorithm menu
export const handleListClick = (event, dispatch, state) => {
  let algo = event.target.innerText;
  const algoList = document.querySelector(".algo-list");
  algoList.classList.toggle("show-menu");
  dispatch({ type: "SET_ALGO", payload: algo });
};

// Dynamically grab grid size
export const getGridSize = () => {
  const grid = document.getElementById("grid");
  const styles = getComputedStyle(grid);
  const row = styles.gridTemplateRows.split(" ").length;
  const col = styles.gridTemplateColumns.split(" ").length;
  return [row, col];
};

// Find index of new Start node or Target node
export const getIndexOf = (target) => {
  const parentNode = document.getElementById("grid");
  const childNodes = parentNode.children;
  const [...childNodesArr] = childNodes;
  const index = childNodesArr.indexOf(target);
  return index;
};

// Get node object via on row/col
export const getNodeObject = (state, row, col) => {
  let nodeObj = state.nodes.filter(
    (node) => node.row === row && node.col === col
  );
  return nodeObj[0];
};
