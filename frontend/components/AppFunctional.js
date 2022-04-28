import React from "react";
import { useState } from "react";
import axios from "axios";


export default function AppFunctional(props) {
  const [grid, setGrid] = useState([
    [null, null, null],
    [null, "B", null],
    [null, null, null],
  ]);
  const [moves, setMoves] = useState(0);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const getCoordinates = () => {
    let xy = [];
    for (let idY = 0; idY < grid.length; idY++) {
      const nestedArr = grid[idY];
      for (let idX = 0; idX < nestedArr.length; idX++) {
        const sqr = nestedArr[idX];
        if (sqr === "B") {
          xy = [idX + 1, idY + 1];
          return xy;
        }
      }
    }
  };

  const handleMove = (direction) => {
    let x = getCoordinates()[0] - 1;
    let y = getCoordinates()[1] - 1;
    const newGrid = [...grid];
    switch (direction) {
      case "L":
        //left functionality ---- x - 1 until we hit the left border (aka x = 1) then display error msg
        if (x > 0) {
          newGrid[y][x] = null;
          x = x - 1;
          newGrid[y][x] = "B";
          setGrid(newGrid);
          setMoves(moves + 1);
        } else {
          setMessage("You can't go left");
        }
        break;
      case "R":
        //right functionality ---- x + 1 until we hit the right border (aka x = 3) then display error msg
        if (x < 2) {
          newGrid[y][x] = null;
          x = x + 1;
          newGrid[y][x] = "B";
          setGrid(newGrid);
          setMoves(moves + 1);
        } else {
          setMessage("You can't go right");
        }
        break;
      case "U":
        //up functionality ---- y - 1 until we hit the top border (aka y = 1) then display error msg
        if (y > 0) {
          newGrid[y][x] = null;
          y = y - 1;
          newGrid[y][x] = "B";
          setGrid(newGrid);
          setMoves(moves + 1);
        } else {
          setMessage("You can't go up");
        }
        break;
      case "D":
        //down functionality ---- y + 1 until we hit the top border (aka y = 1) then display error msg
        if (y < 2) {
          newGrid[y][x] = null;
          y = y + 1;
          newGrid[y][x] = "B";
          setGrid(newGrid);
          setMoves(moves + 1);
        } else {
          setMessage("You can't go down");
        }
        break;
    }
  };

  const resetGrid = () => {
    setGrid([
      [null, null, null],
      [null, "B", null],
      [null, null, null],
    ]);
    setMoves(0);
    setEmail("");
    setMessage("");
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const x = getCoordinates()[0];
  const y = getCoordinates()[1];
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:9000/api/result", {
        x: x,
        y: y,
        steps: moves,
        email: email,
      })
      .then((res) => {
        setMessage(res.data.message);
      })
      .catch((err) => {
        setMessage(err.response.data.message);
      });
    setEmail("");
  };

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">
          Coordinates ({x}, {y})
        </h3>
        <h3 id="steps">You moved {moves} time{moves === 1 ? '' : 's'}</h3>
      </div>
      <div id="grid">
        {grid.map((nestedArr, idxY) => {
          return nestedArr.map((val, idxX) => {
            return (
              <div
                key={idxY + idxX}
                className={val === "B" ? "square active" : "square"}
              >
                {val}
              </div>
            );
          });
        })}
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={() => handleMove("L")}>
          LEFT
        </button>
        <button id="up" onClick={() => handleMove("U")}>
          UP
        </button>
        <button id="right" onClick={() => handleMove("R")}>
          RIGHT
        </button>
        <button id="down" onClick={() => handleMove("D")}>
          DOWN
        </button>
        <button id="reset" onClick={() => resetGrid()}>
          reset
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          id="email"
          type="email"
          placeholder="type email"
          onChange={handleEmail}
          value={email}
        ></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  );
}
