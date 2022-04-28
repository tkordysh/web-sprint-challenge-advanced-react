import React from "react";
import axios from "axios";

export default class AppClass extends React.Component {
  state = {
    grid: [
      [null, null, null],
      [null, "B", null],
      [null, null, null],
    ],
    totalMoves: 0,
    email: "",
    message: "",
  };


  getCoordinates = () => {
    let array = this.state.grid;
    let xy = [];
    for (let idY = 0; idY < array.length; idY++) {
      const nestedArr = array[idY];
      for (let idX = 0; idX < nestedArr.length; idX++) {
        const sqr = nestedArr[idX];
        if (sqr === "B") {
          xy = [idX + 1, idY + 1];
          return xy;
        }
      }
    }
  };

  handleMove = (direction) => {
    let x = this.getCoordinates()[0] - 1;
    let y = this.getCoordinates()[1] - 1;
    const newGrid = [...this.state.grid]
    switch(direction) {
      case "L":
        //left functionality ---- x - 1 until we hit the left border (aka x = 1) then display error msg
        if (x > 0) {
          newGrid[y][x] = null
          x = x - 1;
          newGrid[y][x] = "B"
          this.setState({
            grid: newGrid,
            totalMoves: this.state.totalMoves + 1,
          })
        } else {
          this.setState({
            message: "You can't go left"
          })
        }
        break;
      case "R":
        //right functionality ---- x + 1 until we hit the right border (aka x = 3) then display error msg
        if (x < 2) {
          newGrid[y][x] = null
          x = x + 1;
          newGrid[y][x] = "B"
          this.setState({
            grid: newGrid,
            totalMoves: this.state.totalMoves + 1,
          })
        } else {
          this.setState({
            message: "You can't go right"
          })
        }
        break;
      case "U":
        //up functionality ---- y - 1 until we hit the top border (aka y = 1) then display error msg
        if (y > 0) {
          newGrid[y][x] = null
          y = y - 1;
          newGrid[y][x] = "B"
          this.setState({
            grid: newGrid,
            totalMoves: this.state.totalMoves + 1,
          })
        } else {
          this.setState({
            message: "You can't go up"
          })
        }
        break;
      case "D":
        //down functionality ---- y + 1 until we hit the top border (aka y = 1) then display error msg 
        if (y < 2) {
          newGrid[y][x] = null
          y = y + 1;
          newGrid[y][x] = "B"
          this.setState({
            grid: newGrid,
            totalMoves: this.state.totalMoves + 1,
          })
        } else {
          this.setState({
            message: "You can't go down"
          })
        }
        break;
      default:
        return this.state    
    }
  }

  resetGrid = () => {
    this.setState({
      ...this.state,
      grid: [
        [null, null, null],
        [null, "B", null],
        [null, null, null],
      ],
      totalMoves: 0,
      email: "",
      message: "",
    });
  };

  handleEmail = (e) => {
    this.setState({
      ...this.state,
      email: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:9000/api/result", {
        x: this.getCoordinates()[0],
        y: this.getCoordinates()[1],
        steps: this.state.totalMoves,
        email: this.state.email,
      })
      .then((res) => {
        this.setState({
          ...this.state,
          message: res.data.message,
        });
      })
      .catch((err) => {
        this.setState({
          ...this.state,
          message: err.response.data.message,
        });
      });
    this.setState({
      ...this.state,
      email: "",
    });
  };

  render() {
    const x = this.getCoordinates()[0];
    const y = this.getCoordinates()[1];
    const { className } = this.props;


    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">
            Coordinates ({x}, {y})
          </h3>
          <h3 id="steps">You moved {this.state.totalMoves} time{this.state.totalMoves === 1 ? '' : 's'}</h3>
        </div>
        <div id="grid">
          {this.state.grid.map((nestedArr, idxY) => {
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
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={() => this.handleMove("L")}>
            LEFT
          </button>
          <button id="up" onClick={() => this.handleMove("U")}>
            UP
          </button>
          <button id="right" onClick={() => this.handleMove("R")}>
            RIGHT
          </button>
          <button id="down" onClick={() => this.handleMove("D")}>
            DOWN
          </button>
          <button id="reset" onClick={() => this.resetGrid()}>
            reset
          </button>
        </div>
        <form onSubmit={this.handleSubmit}>
          <input
            id="email"
            type="email"
            placeholder="type email"
            onChange={this.handleEmail}
            value={this.state.email}
          ></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    );
  }
}
