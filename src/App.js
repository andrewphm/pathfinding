import React, { useState } from "react";

// Components
import Tutorial from "./components/Tutorial";
import Home from "./components/Home";

function App() {
  const [tutorial, setTutorial] = useState(true);

  return (
    <>
      {tutorial && <Tutorial tutorial={tutorial} setTutorial={setTutorial} />}
      <div id="main">
        <Home />
      </div>
    </>
  );
}

export default App;
