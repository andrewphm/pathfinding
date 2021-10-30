export const reducer = (state, action) => {
  if (action.type === "BUILDING_WALL") {
    state.isMouseDown = action.payload;
    return state;
  }

  if (action.type === "IS_RUNNING") {
    state.isRunning = action.payload;
    return state;
  }

  if (action.type === "START_NODE") {
    state.startNodeIndex = action.payload;
    return state;
  }

  if (action.type === "TARGET_NODE") {
    state.targetNodeIndex = action.payload;
    return state;
  }

  // Assign algo state
  if (action.type === "SET_ALGO") {
    state.algo = action.payload;
    const newState = { ...state, algo: action.payload };
    return newState;
  }

  // Moving start or target nodes
  if (action.type === "MOVING_START") {
    state.isMovingStart = action.payload;
    return state;
  }
  if (action.type === "MOVING_TARGET") {
    state.isMovingTarget = action.payload;
    return state;
  }

  // changing start/target node index
  if (action.type === "ASSIGN_START") {
    state.startNodeIndex = action.payload;
    return state;
  }
  if (action.type === "ASSIGN_TARGET") {
    state.targetNodeIndex = action.payload;
    return state;
  }

  // Validating if pathfinding is done
  if (action.type === "IS_FINISHED") {
    state.isFinished = action.payload;
    return state;
  }
};
