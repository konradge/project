import React, { Component } from "react";
import Statistic from "./Statistic";
import { connect } from "react-redux";
import { createRandomWorkout, selectExercise, addWeight } from "../actions";
import Popup from "./Popup";
class Main extends Component {
  state = {
    lastWeight: this.props.lastWeight,
    weightChanged: false
  };
  startPopupContent() {
    if (this.props.currentWorkout.title === null) {
      return null;
    }
    return (
      <div>
        <button onClick={() => this.props.history.push("/workout/-1")}>
          Select Workout
        </button>
        <button onClick={() => this.props.history.push("/workout")}>
          {this.props.currentWorkout.title}
        </button>
      </div>
    );
  }
  calcWorkoutsPerWeek() {
    const { lastWorkouts } = this.props.userHistory;
    const startDate = lastWorkouts[0].date;
    const timeMillis = new Date() - startDate;
    const timeWeeks = Math.floor(timeMillis / 1000 / 60 / 60 / 24 / 7);
    const average = lastWorkouts.length / timeWeeks;
    return average.toFixed(2);
  }
  calcMinutesWorkoutTime() {
    return (
      this.props.userHistory.totalTrainingTime /
      this.props.userHistory.lastWorkouts.length
    );
  }
  render() {
    console.log(this.props);
    return (
      <div>
        <h1>Welcome back!</h1>
        <Statistic value={this.calcWorkoutsPerWeek()} label="workouts/week" />
        <Statistic
          value={this.calcMinutesWorkoutTime()}
          label="Ø minutes workout time"
        />
        <div>
          <Statistic
            value={this.state.lastWeight}
            label={
              <div>
                <i
                  className="arrow alternate circle down icon"
                  onClick={() =>
                    this.setState({
                      weightChanged: true,
                      lastWeight: parseFloat(
                        (this.state.lastWeight - 0.1).toFixed(1)
                      )
                    })
                  }
                ></i>
                kg weight
                <i
                  className="arrow alternate circle up icon"
                  onClick={() =>
                    this.setState({
                      weightChanged: true,
                      lastWeight: parseFloat(
                        (this.state.lastWeight + 0.1).toFixed(1)
                      )
                    })
                  }
                ></i>
              </div>
            }
          />
          {this.state.weightChanged ? (
            <div
              onClick={() => {
                this.setState({ weightChanged: false });
                this.props.addWeight(this.state.lastWeight);
              }}
            >
              Save changes
            </div>
          ) : null}
        </div>
        <br />
        <Popup
          trigger={
            <i
              className="play icon massive"
              onClick={() => {
                console.log("click");
                this.props.currentWorkout.title === null
                  ? this.props.history.push("/workout")
                  : console.log("asdf");
              }}
            ></i>
          }
          content={this.startPopupContent()}
          canOpen={this.props.currentWorkout.title === null ? false : true}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    exercisePool: state.exercisePool,
    currentWorkout: state.currentWorkout,
    userHistory: state.userData.history,
    lastWeight:
      state.userData.history.weight[state.userData.history.weight.length - 1]
        .weight
  };
};

export default connect(mapStateToProps, {
  createRandomWorkout,
  selectExercise,
  addWeight
})(Main);
