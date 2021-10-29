export const reducer = (state, action) => {
  if (action.type === "BUILDING_WALL") {
    console.log("reducer firing");
    state.isMouseDown = action.payload;
    console.log(state.isMouseDown);
    return state;
  }
  if (action.type === "IS_RUNNING") {
    console.log("reducer firing");
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

  // assign algo state
  if (action.type === "SET_ALGO") {
    console.log("firing reducer");
    state.algo = action.payload;
    const newState = { ...state, algo: action.payload };

    return newState;
  }

  //Moving start or target nodes
  if (action.type === "MOVING_START") {
    state.isMovingStart = action.payload;
    console.log(state.isMovingStart);
    return state;
  }
  if (action.type === "MOVING_TARGET") {
    state.isMovingTarget = action.payload;
    console.log(state.isMovingTarget);
    return state;
  }

  // chaning start/target node index
  if (action.type === "ASSIGN_START") {
    state.startNodeIndex = action.payload;
    console.log(state);
    return state;
  }
  if (action.type === "ASSIGN_TARGET") {
    state.targetNodeIndex = action.payload;
    console.log(state);
    return state;
  }

  // Validating if pathfinding is done
  if (action.type === "IS_FINISHED") {
    state.isFinished = true;
    return state;
  }
};
