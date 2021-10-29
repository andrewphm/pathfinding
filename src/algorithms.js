// DFS
export const dfs = async (state, dispatch, getNodeObject, getGridSize) => {
  const timeout = (time) => new Promise((resolve) => setTimeout(resolve, time));

  // Get grid size
  const row = getGridSize()[0];
  const col = getGridSize()[1];

  const startNode = state.nodes[state.startNodeIndex];
  const stack = [startNode];

  while (stack.length > 0) {
    let currentNode = stack.pop();
    let currentX = currentNode.row;
    let currentY = currentNode.col;
    let currentNodeDom = document.getElementById(
      `node-${currentX}-${currentY}`
    );

    // Check to see if current node is target
    // Marks current node as visited
    if (currentNodeDom.classList.contains("target")) {
      dispatch({ type: "IS_RUNNING", payload: false });
      return;
    }
    if (!currentNodeDom.classList.contains("start"))
      currentNodeDom.classList.add("visited");

    // Directional Vectors left down right up
    const rowVectors = [0, 1, 0, -1];
    const colVectors = [-1, 0, 1, 0];

    // Validate neighbour nodes
    for (let i = 0; i < 4; i++) {
      // Using timeout to slow down loop for better viewability
      await timeout(10);
      let xCord = currentX + rowVectors[i];
      let yCord = currentY + colVectors[i];

      // Validate node is inbound
      if (xCord >= 0 && xCord < row && yCord >= 0 && yCord < col) {
        let nextNode = document.getElementById(`node-${xCord}-${yCord}`);
        let classes = nextNode.classList;
        let isVisited = classes.contains("visited");
        let isWall = classes.contains("wall");
        // Validate node is not a wall and hasn't been visited
        if (!isVisited && !isWall) {
          let nodeObj = getNodeObject(xCord, yCord);
          // Push neighbour node to stack
          stack.push(nodeObj);
        }
      }
    }
  }
  // If target is not found, change state of isRunning
  if (stack.length === 0) dispatch({ type: "IS_RUNNING", payload: false });
};

export const bfs = async (state, dispatch, getNodeObject, getGridSize) => {
  // timeout function to slow down the for loop
  const timeout = (time) => new Promise((resolve) => setTimeout(resolve, time));

  // Get grid size
  const row = getGridSize()[0];
  const col = getGridSize()[1];

  // Get start node and add to queue
  const nodes = state.nodes;
  const startNode = nodes[state.startNodeIndex];
  const visited = new Set([startNode]);
  const queue = [startNode];
  let parents = [];
  while (queue.length > 0) {
    const currentNode = queue.shift();
    parents = [...currentNode.parents];
    const currentX = currentNode.row;
    const currentY = currentNode.col;
    const currentNodeDom = document.getElementById(
      `node-${currentX}-${currentY}`
    );
    currentNode.dom = currentNodeDom;
    currentNodeDom.classList.remove("queue");

    // Validate if current node is target
    if (currentNodeDom.classList.contains("target")) {
      console.log(currentNode);
      backtracking(currentNode);
      dispatch({ type: "IS_RUNNING", payload: false });
      return;
    }

    // Mark current node as visited
    if (!currentNodeDom.classList.contains("start"))
      currentNodeDom.classList.add("visited");

    // Validate neighbour nodes
    // Directional Vectors left down right up
    const rowVectors = [0, 1, 0, -1];
    const colVectors = [-1, 0, 1, 0];
    for (let i = 0; i < 4; i++) {
      await timeout(10);
      const xCord = currentX + rowVectors[i];
      const yCord = currentY + colVectors[i];

      // Validate if it is inbound
      if (xCord >= 0 && xCord < row && yCord >= 0 && yCord < col) {
        // Validate if it has been visited
        let nextNode = document.getElementById(`node-${xCord}-${yCord}`);
        let isVisited = nextNode.classList.contains("visited");
        let isWall = nextNode.classList.contains("wall");
        if (!isVisited && !isWall) {
          let nextNodeObj = getNodeObject(xCord, yCord);
          if (!visited.has(nextNodeObj)) {
            nextNode.classList.add("queue");
            nextNodeObj.parents = [...parents, currentNode];
            visited.add(nextNodeObj);
            queue.push(nextNodeObj);
          }
        }
      }
    }
    parents = [];
  }
  dispatch({ type: "IS_RUNNING", payload: false });
  return;
};

const backtracking = (currentNode) => {
  const path = currentNode.parents;
  currentNode.dom.classList.add("shortest");
  for (let i = path.length - 1; i >= 0; i--) {
    path[i].dom.classList.add("shortest");
  }
};
