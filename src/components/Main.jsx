/*
  Hauptseite mit Übersicht über bisheriges Training und der Möglichkeit, ein Training zu starten
*/

import React, { Component } from "react";
import { connect } from "react-redux";
import Popup from "./Popup";
import { findById } from "../helpers";
import WorkoutStatistics from "./Overview/WorkoutStatistics";
import { Redirect } from "react-router-dom";
class Main extends Component {
  //Falls bereits früher ein Workout gestartet wurde, kann es hier direkt ausgewählt werden
  startPopupContent() {
    if (!this.props.currentWorkout) {
      return <Redirect to="/be-fit/workout/-1" />;
    }
    return (
      <div className="ui center aligned basic vertical segment">
        <div
          className="ui button"
          onClick={() => this.props.history.push("/be-fit/workout/-1")}
        >
          <i className="mouse pointer icon"></i> Select Workout
        </div>
        <div className="ui horizontal divider">Or</div>
        <div className="ui buttons">
          <button
            className="ui button"
            onClick={() => {
              this.props.history.push(
                "/be-fit/workout/" + this.props.currentWorkout.id
              );
            }}
          >
            <i className="redo icon" />
            Restart
          </button>
          <div className="or"></div>
          <button
            className="ui positive button"
            onClick={() => this.props.history.push("/be-fit/workout")}
          >
            <i className="play icon" />
            Continue
          </button>
          Hello World
        </div>
        {this.props.currentWorkout.title}
      </div>
    );
  }
  render() {
    return (
      <div>
        <div className="title">
          <div className="heading">Welcome back!</div>
        </div>
        <div className="ui grid main">
          <div className="eight wide column">
            <WorkoutStatistics />
          </div>
          <div className="play-icon four wide column">
            <Popup
              trigger={
                <div className="start-workout">
                  <i className="fas fa-play"></i>
                  <div>Start your workout NOW!</div>
                </div>
              }
              content={this.startPopupContent()}
              canOpen={true}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const currentWorkout = findById(
    state.userData.workouts,
    state.current.workout
  );
  return {
    currentWorkout,
    state,
    exercise: state.userData.exercises[0]
  };
};

export default connect(mapStateToProps)(Main);
