import React, { Component } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

import { addTime, setStoppedAt } from "../actions";
import { connect } from "react-redux";

//Anzeige einer Übung mit zugehöriger Zeit
class Exercise extends Component {
  state = { key: 0 };
  renderTime(time) {
    //Funktion wird 60 Mal in der Sekunde aufgerufen
    //Füge jedes mal 1/60 Sekunde zur Trainingszeit hinzu
    this.props.addTime(1 / 60 / 60);
    this.props.setStoppedAt(this.props.exercise.duration - time);
    if (time === 0) {
      this.setState({ key: this.state.key + 1 });
      this.props.next();
    }
    return (
      <div className="timer-description">
        <div className="time">{time}</div>
        <h1>{this.props.exercise.name}</h1>
      </div>
    );
  }
  render() {
    console.log(this.props.exercise.duration);
    return (
      <div className="">
        <div className="timer-div">
          <CountdownCircleTimer
            className="timer"
            key={"" + this.props.exercise.id + this.state.key}
            durationSeconds={this.props.exercise.duration}
            colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
            isPlaying={this.props.running}
            startAt={this.props.startAt}
            renderTime={this.renderTime.bind(this)}
            size={500}
          />
        </div>
        <div className="exercise-description">
          <h1 className="ui block header">
            {this.props.exercise.name}
            <span>
              <i className="edit icon" onClick={() => this.props.edit()}></i>
            </span>
          </h1>
          <div className="ui segments">
            {this.props.exercise.image ? (
              <div className="ui segment">
                <img
                  className="exercise-description-image"
                  src={this.props.exercise.image}
                  alt={"Image of " + this.props.exercise.name}
                />
              </div>
            ) : null}
            <div className="ui segment exercise-description-text">
              {this.props.exercise.description}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { addTime, setStoppedAt })(Exercise);
