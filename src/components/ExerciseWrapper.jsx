import React, { Component } from "react";
import { connect } from "react-redux";

import { selectExercise, createWorkout } from "../actions";
import Exercise from "./Exercise.jsx";

class ExerciseWrapper extends Component {
  state = {
    time: 0
  };
  constructor(props) {
    super(props);
    this.timer = {
      interval: setInterval(() => {
        this.countDown();
      }, 100),
      isRunning: true
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.exercise === null && this.props.workout) {
      console.log(this.props.workout);
      this.props.selectExercise(this.props.workout, 0);
    } else if (prevProps !== this.props) {
      this.setState({ time: this.props.exercise.duration });
    }
  }
  countDown() {
    this.setState({ time: this.state.time - 0.1 });
  }

  nextExercise() {
    this.setState({ time: this.props.exercise.duration });
  }

  pauseTimer() {
    if (this.timer.isRunning) {
      clearInterval(this.timer.interval);
      this.timer.isRunning = false;
    }
  }
  runTimer() {
    if (!this.timer.isRunning) {
      this.timer.interval = setInterval(() => {
        this.countDown();
      }, 100);
    }
  }
  next() {
    this.props.selectExercise(
      this.props.workout,
      this.props.exercise.index + 1
    );
  }
  render() {
    if (this.props.exercise === null) {
      return (
        <div>
          <h1>Please select a workout</h1>
          <div
            onClick={() => {
              this.props.createWorkout(this.props.exercisePool, 4);
            }}
          >
            Create random workout
          </div>
        </div>
      );
    }
    return (
      <div>
        <Exercise exercise={this.props.exercise} time={this.state.time} />
        <div className="ui grid exercise-menu">
          <div className="four wide column">
            <i
              className="step backward icon"
              onClick={() => console.log("backward")}
            ></i>
          </div>
          <div className="four wide column">
            <i className=" icon" onClick={() => this.pauseTimer()}></i>
          </div>
          <div className="four wide column">
            <i className="step forward icon" onClick={() => this.next()}></i>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    exercise: state.currentExercise,
    workout: state.currentWorkout.exercises,
    exercisePool: state.exercisePool
  };
};

export default connect(mapStateToProps, { selectExercise, createWorkout })(
  ExerciseWrapper
);
