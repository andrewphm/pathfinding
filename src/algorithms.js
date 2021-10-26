// DSF
export const dfs = async (state, dispatch, getNodeObject) => {
  const timeout = (time) => new Promise((resolve) => setTimeout(resolve, time));

  const nodes = state.nodes;
  let startNode = nodes.filter((node) => node.isStart === true);
  startNode = startNode[0];
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

      // Dynamically find value of row and col
      const grid = document.getElementById("grid");
      const styles = getComputedStyle(grid);
      const row = styles.gridTemplateRows.split(" ").length;
      const col = styles.gridTemplateColumns.split(" ").length;

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
