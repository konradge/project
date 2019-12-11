import React, { Component } from "react";
import Statistic from "./Statistic";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { createRandomWorkout, selectExercise } from "../actions";
class Main extends Component {
  state = {};
  render() {
    return (
      <div>
        <h1>Welcome back!</h1>
        <Statistic value={2} label="workouts/week" />
        <Statistic value={20} label="Ø minutes workout time" />
        <Statistic value={75} label="kg weigth" />
        <div
          onClick={() => {
            this.props.createRandomWorkout(this.props.exercisePool, 4);
          }}
        >
          Create random workout
        </div>
        <Link to="/workout">START YOUR WORKOUT</Link>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    exercisePool: state.exercisePool,
    currentWorkout: state.currentWorkout
  };
};

export default connect(mapStateToProps, {
  createRandomWorkout,
  selectExercise
})(Main);
