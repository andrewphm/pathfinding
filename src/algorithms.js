// DFS
export const dfs = async (state, dispatch, getNodeObject, getGridSize) => {
  const timeout = (time) => new Promise((resolve) => setTimeout(resolve, time));

  const nodes = state.nodes;
  const startNode = nodes.filter((node) => node.isStart === true)[0];
  const stack = [startNode];

  while (stack.length > 0) {
    let currentNode = stack.pop();
    let currentX = currentNode.row;
    let currentY = currentNode.col;
    let currentNodeDom = document.getElementById(
      `node-${currentX}-${currentY}`
    );

    // Get length of row and col
    const row = getGridSize()[0];
    const col = getGridSize()[1];

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

  // Get start node and add to queue
  const nodes = state.nodes;
  const startNode = nodes.filter((node) => node.isStart === true)[0];

  const queue = [startNode];
  console.log(queue[0]);
  while (queue) {
    console.log(`while loop`);
    const currentNode = queue.shift();
    const currentX = currentNode.row;
    const currentY = currentNode.col;
    const currentNodeDom = document.getElementById(
      `node-${currentX}-${currentY}`
    );

    // Validate if current node is target
    if (currentNode.isTarget) {
      dispatch({ type: "IS_RUNNING", payload: false });
      return;
    }
    // Mark current node as visited
    if (!currentNode.isStart) currentNodeDom.classList.add("visited");

    // Get grid size
    const row = getGridSize()[0];
    const col = getGridSize()[1];

    // Validate neighbour nodes
    // Directional Vectors left down right up
    const rowVectors = [0, 1, 0, -1];
    const colVectors = [-1, 0, 1, 0];
    for (let i = 0; i < 4; i++) {
      await timeout(1);
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
          let isInQueue = queue.some(
            (node) =>
              node.row === nextNodeObj.row && node.col === nextNodeObj.col
          );
          if (!isInQueue) queue.push(nextNodeObj);
        }
      }
    }
  }
};
