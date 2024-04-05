import React, { useState, useRef } from "react";
import "./TicTacToe.css";
import circle_icon from "../Assets/circle.png";
import cross_icon from "../Assets/cross.png";

const TicTacToe = () => {

  // State to keep track of the number of moves
  const [count, setCount] = useState(0);
  // State to lock the board after the game ends
  const [lock, setLock] = useState(false);
  // Reference to the title element for updating the game status
  const titleRef = useRef(null);
  // State to store the current state of each box
  const [boxes, setBoxes] = useState(Array(9).fill(null));


   // Function to toggle between X and O
  const toggle = (index) => {
    if (lock || boxes[index]) {
      return;
    }

    const newBoxes = [...boxes];
    newBoxes[index] = count % 2 === 0 ? "x" : "o";

    setBoxes(newBoxes);
    setCount(count + 1);

    checkWin(newBoxes);
  };

  // Function to check for a winner
  const checkWin = (boxes) => {
     // Define winning combinations
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    // Check each winning combination
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (boxes[a] && boxes[a] === boxes[b] && boxes[a] === boxes[c]) {
         // If a player wins, call the 'won' function
        won(boxes[a]);
        return;
      }
    }

     // If all boxes are filled and no one wins, it's a draw
    if (count === 9) {
      setTitle("It's a draw!");
      setLock(true);
    }
  };

    // Function to handle a win
  const won = (winner) => {
     // Lock the board and update the title with the winner
    setLock(true);
    setTitle(
      `Congratulations: ${
        winner === "x" ? "Cross" : "Circle"
      } Wins`
    );
  };

  // Function to update the title
  const setTitle = (title) => {
    titleRef.current.innerHTML = title;
  };

  // Function to reset the game
  const reset = () => {
    // Reset the board, count, and unlock the board
    setLock(false);
    setCount(0);
    setTitle("Tic Tac Toe<span>Game</span>");
    setBoxes(Array(9).fill(null));
  };

  return (
    <div className="container">
        {/* Display the game title */}
      <h1 className="title" ref={titleRef}>
        Tic Tac Toe<span>Game</span>
      </h1>
      {/* Display the game board */}
      <div className="board">
        {Array.from({ length: 3 }, (_, row) => (
          <div className={`row${row + 1}`} key={row}>
            {Array.from({ length: 3 }, (_, col) => (
              <div
                key={row * 3 + col}
                className="boxes"
                onClick={() => toggle(row * 3 + col)}
              >
                {/* Display X or O icon based on the box state */}
                {boxes[row * 3 + col] === "x" && (
                  <img
                    src={cross_icon}
                    alt="Cross Icon"
                    className="icon"
                  />
                )}
                {boxes[row * 3 + col] === "o" && (
                  <img
                    src={circle_icon}
                    alt="Circle Icon"
                    className="icon"
                  />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
       {/* Reset button to start a new game */}
      <button className="reset" onClick={reset}>
        Reset
      </button>
    </div>
  );
};

export default TicTacToe;
