/*
  Hauptseite mit Übersicht über bisheriges Training und der Möglichkeit, ein Training zu starten
*/

import React, { Component } from "react";
import { connect } from "react-redux";
import Popup from "./Popup";
import { getWorkout } from "../helpers";
import WorkoutStatistics from "./WorkoutStatistics";
import WgerSearch from "./WgerSearch";
class Main extends Component {
  //Falls bereits früher ein Workout gestartet wurde, kann es hier direkt ausgewählt werden
  startPopupContent() {
    if (!this.props.currentWorkout) {
      return null;
    }
    return (
      <div className="start-popup ui center aligned basic segment">
        <div
          className="ui button"
          onClick={() => this.props.history.push("/workout/-1")}
        >
          <i className="mouse pointer icon"></i> Select Workout
        </div>
        <div className="ui horizontal divider">Or</div>
        <div
          className="ui button"
          onClick={() => this.props.history.push("/workout")}
        >
          <i className="play icon"></i> Continue{" "}
          {this.props.currentWorkout.title}
        </div>
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
                  <i
                    className="fas fa-play"
                    onClick={() => {
                      console.log("click");
                      !this.props.currentWorkout
                        ? this.props.history.push("/workout")
                        : console.log("asdf");
                    }}
                  ></i>
                  <div>Start your workout NOW!</div>
                </div>
              }
              content={this.startPopupContent()}
              canOpen={!!this.props.currentWorkout}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const currentWorkout = getWorkout(
    state.current.workout,
    state.userData.workouts
  );
  return {
    currentWorkout,
    state
  };
};

export default connect(mapStateToProps)(Main);
