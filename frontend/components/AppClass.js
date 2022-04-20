import React from "react";
import axios from "axios";

export default class AppClass extends React.Component {
  state = {
    grid: ["", "", "", "", "B", "", "", "", ""],
    totalMoves: 0,
    email: '',
    message: ''
  };

  gridCoordinates = [
    "11",
    "21",
    "31",
    "12",
    "22",
    "32",
    "13",
    "23",
    "33"
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

  handleEmail = (e) => {
    this.setState({
      ...this.state,
      email: e.target.value
    })
  }


  
  

  render() {
    const [x, y] = this.getCoordinates(this.state.grid)
    const { className } = this.props;

   const handleSubmit = (e) => {
      e.preventDefault();
      axios.post('http://localhost:9000/api/result', { "x": x, "y": y, "steps": this.state.totalMoves, "email": this.state.email })
        .then(res => {
          console.log(res.data.message)
          this.setState({
            ...this.state,
            message: res.data.message
          })
        })
        .catch(err => {
          debugger
        })
    }

    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">
            Coordinates ({x}, {y})
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
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={() => this.handleMove()}>LEFT</button>
          <button id="up" onClick={() => this.handleMove()}>UP</button>
          <button id="right" onClick={() => this.handleMove()}>RIGHT</button>
          <button id="down" onClick={() => this.handleMove()}>DOWN</button>
          <button id="reset" onClick={() => this.resetGrid()}>reset</button>
        </div>
        <form onSubmit={handleSubmit}>
          <input id="email" type="email" placeholder="type email" onChange={this.handleEmail}></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    );
  }
}
