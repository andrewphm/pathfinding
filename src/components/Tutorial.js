import React, { useState } from "react";

import slide3img from "../assets/choose-algorithm.png";
import makingWalls from "../assets/making-walls.gif";

const Tutorial = ({ tutorial, setTutorial }) => {
  const [slide, setSlide] = useState(1);
  const showSlide = (slide) => {
    if (slide === 1) {
      return (
        <div className="slide">
          <h1>Welcome to the Pathfinding Visualizer!</h1>
          <h2>
            This short tutorial will walk you through all the features of this
            application.
          </h2>
          <p>
            If you want to dive right in, feel free to press the "Skip Tutorial"
            button below. Otherwise, press "Next"!
          </p>
          <div className="slide-img-1"></div>
        </div>
      );
    } else if (slide === 2) {
      return (
        <div className="slide">
          <h1>What is a Pathfinding Algorithm?</h1>
          <h2>
            At its core, a pathfinding algorithm seeks to find the shortest path
            between two points. This application visualizes various pathfinding
            algorithms in action, and more!
          </h2>
          <p>
            A real world use of these pathfinding algorithms is when you're
            looking up directions on a GPS app. You're trying to find the
            shortest path between two addresses.
          </p>
          <div className="slide-img-2"></div>
        </div>
      );
    } else if (slide === 3) {
      return (
        <div className="slide">
          <h1>Choosing an algorithm</h1>
          <h2>
            The first step is choosing an algorithm from the "Algorithms"
            drop-down menu
          </h2>
          <p>
            Note that some algorithms are <strong>unweighted</strong>, while
            others are <strong>weighted</strong>. Unweighted algorithms do not
            take turns or weight nodes into account, whereas weighted ones do.
            Additionally, not all algorithms guarantee the shortest path.
          </p>
          <div className="image-wrapper">
            <img src={slide3img} alt="" />
          </div>
        </div>
      );
    } else if (slide === 4) {
      return (
        <div className="slide">
          <h1>Meet the Algorithms</h1>
          <h2>Not all algorithms are created equal.</h2>
          <p>
            <strong>Breadth-first Search</strong> (unweighted): a great
            algorithm, guarantees the shortest path.
            <br></br>
            <br></br>
            <strong>Depth-first Search</strong> (unweighted): a very bad
            algorithm, does not guarantee the shortest path.
            <br></br>
            <br></br>
            <strong>Dijkstra's Algorithm</strong> (weighted): the father of
            pathfinding algorithms, guarantees the shortest path.
            <br></br>
            <br></br>
            <strong>A* Search</strong> (weighted): arguably the best pathfinding
            algorithm; uses heuristics to guarantee the shortest path much
            faster than Dijkstra's Algorithm.
            <br></br>
            <br></br>
            <strong>More algorithms coming soon!</strong>
          </p>
        </div>
      );
    } else if (slide === 5) {
      return (
        <div className="slide">
          <h1>Adding Walls</h1>
          <h2>Click and drag on the grid to create walls</h2>
          <p>
            Walls are impenetrable, meaning the path cannot go through them.
            Feel free to draw up walls to visualize how the algorithm deals with
            them. To remove walls click the "Clear Walls" button at the top!
          </p>
          <div className="image-wrapper">
            <img src={makingWalls} alt="" />
          </div>
        </div>
      );
    }
  };
  return (
    <section className="overlay">
      <div className="tutorial">
        <div className="slide-number">
          <p>{slide}/9</p>
        </div>
        <div className="close-tutorial" onClick={() => setTutorial(false)}>
          <i className="ri-close-fill"></i>
        </div>

        {showSlide(slide)}

        <div className="skip-tutorial">
          <button className="tutorial-btn" onClick={() => setTutorial(false)}>
            Skip tutorial
          </button>
        </div>
        <div className="change-slide">
          {slide > 1 && (
            <button
              className="tutorial-btn"
              onClick={() => setSlide(slide - 1)}
            >
              Previous
            </button>
          )}
          {slide < 9 && (
            <button
              className="tutorial-btn"
              onClick={() => setSlide(slide + 1)}
            >
              Next
            </button>
          )}
        </div>
      </div>
      {console.log(slide)}
    </section>
  );
};

export default Tutorial;
