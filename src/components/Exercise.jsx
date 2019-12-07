import React, { Component } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "../style.css";

class Exercise extends Component {
  render() {
    return (
      <div>
        <CircularProgressbar
          className="progress-bar"
          text={Math.floor(this.props.time)}
          value={(this.props.time / this.props.exercise.duration) * 100}
        />
        <div className="exercise-name">{this.props.exercise.name}</div>
      </div>
    );
  }
}

export default Exercise;
