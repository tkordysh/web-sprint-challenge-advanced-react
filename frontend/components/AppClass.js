import React from "react";
import axios from "axios";

export default class AppClass extends React.Component {
  state = {
    // grid: ["", "", "", "", "B", "", "", "", ""],
    grid: [
      [null, null, null],
      [null, "B", null],
      [null, null, null],
    ],
    totalMoves: 0,
    email: "",
    message: "",
  };

  gridCoordinates = [
    ["11", "21", "31"],
    ["12", "22", "32"],
    ["13", "23", "33"],
  ];

  // getCoordinates = (array) => {
  //   let index = 0;
  //   array.forEach((sqr, idx) => {
  //     if (sqr) {
  //       index = idx;
  //       return;
  //     }
  //   });
  //   return this.gridCoordinates[index];
  // };

  GetCoordinates = (array) => {
    let index = 0;
    array.forEach((nestedArr) => {
      return nestedArr.forEach((sqr, idx) => {
        if (sqr) {
          index = idx;
          return;
        }
      });
    });
    return this.gridCoordinates[index];
  };

  // findCurrentIndex = (grid) => {
  //   return grid.indexOf("B")
  // }

  // getGridBasedOnMove = () => {
  // }

  handleMove = () => {};

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

  render() {
    console.log(this.GetCoordinates(this.state.grid));
    // const [x, y] = this.newGetCoordinates(this.state.grid);
    const { className } = this.props;
    // console.log(this.findCurrentIndex(this.state.grid));

    const handleSubmit = (e) => {
      e.preventDefault();
      axios
        .post("http://localhost:9000/api/result", {
          x: x,
          y: y,
          steps: this.state.totalMoves,
          email: this.state.email,
        })
        .then((res) => {
          console.log(res);
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

    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">{/* Coordinates ({x}, {y}) */}</h3>
          <h3 id="steps">You moved {this.state.totalMoves} times</h3>
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
          {/* <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square active">B</div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div> */}
        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={() => this.handleMove()}>
            LEFT
          </button>
          <button id="up" onClick={() => this.handleMove()}>
            UP
          </button>
          <button id="right" onClick={() => this.handleMove()}>
            RIGHT
          </button>
          <button id="down" onClick={() => this.handleMove()}>
            DOWN
          </button>
          <button id="reset" onClick={() => this.resetGrid()}>
            reset
          </button>
        </div>
        <form onSubmit={handleSubmit}>
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
