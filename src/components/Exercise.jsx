import React, { Component } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import "../style.css";

//Anzeige einer Übung mit zugehöriger Zeit
class Exercise extends Component {
  renderTime(time) {
    if (time === 0) {
      this.props.next();
    }
    return (
      <div className="timer-description">
        <div className="time">{time}</div>
        <div>{this.props.exercise.name}</div>
      </div>
    );
  }
  render() {
    console.log(this.props.running);
    return (
      <div className="">
        <div className="timer-div">
          <CountdownCircleTimer
            className="timer"
            key={this.props.exercise.id}
            durationSeconds={this.props.exercise.duration}
            colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
            isPlaying={this.props.running}
            renderTime={this.renderTime.bind(this)}
            size={500}
          />
        </div>
        <div className="exercise-description">
          <div className="vertical-center">
            <h1>{this.props.exercise.name}</h1>
            <img src={this.props.exercise.image} />
            <p>{this.props.exercise.description}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Exercise;
