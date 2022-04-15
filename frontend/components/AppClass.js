import React from "react";

export default class AppClass extends React.Component {
  state = {
    // grid:['1-1', '2-1', '3-1', '1-2', '2-2', '3-2', '1-3', '2-3', '3-3']
    grid: ["", "", "", "", "B", "", "", "", ""],
    totalMoves: 0,
  };

  gridCoordinates = [
    "1, 1",
    "2, 1",
    "3, 1",
    "1, 2",
    "2, 2",
    "3, 2",
    "1, 3",
    "2, 3",
    "3, 3"
  ];

  getCoordinates = (array) => {
    let index = 0;
    array.forEach((sqr, idx) => {
      if (sqr) {
        index = idx;
        return;
      }
    });
    return this.gridCoordinates[index];
  };

  handleMove = () => {
    this.setState({
      ...this.state,
      grid: ["", "", "", "", "B", "", "", "", ""],
      totalMoves: this.state.totalMoves + 1
    })
  }

  resetGrid = () => {
    this.setState({
      ...this.state,
      grid: ["", "", "", "", "B", "", "", "", ""],
      totalMoves: 0
    })
  }

  render() {
    const { className } = this.props;
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">
            Coordinates - {this.getCoordinates(this.state.grid)}
          </h3>
          <h3 id="steps">You moved {this.state.totalMoves} times</h3>
        </div>
        <div id="grid">
          {this.state.grid.map((val, idx) => {
            return (
              <div key={idx} className={val ? "square active" : "square"}>
                {val}
              </div>
            );
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
          <h3 id="message"></h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={() => this.handleMove()}>LEFT</button>
          <button id="up" onClick={() => this.handleMove()}>UP</button>
          <button id="right" onClick={() => this.handleMove()}>RIGHT</button>
          <button id="down" onClick={() => this.handleMove()}>DOWN</button>
          <button id="reset" onClick={() => this.resetGrid()}>reset</button>
        </div>
        <form>
          <input id="email" type="email" placeholder="type email"></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    );
  }
}
