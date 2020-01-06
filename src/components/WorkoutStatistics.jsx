import React, { Component } from "react";
import { connect } from "react-redux";

import { addWeight } from "../actions";
import Statistic from "./Statistic";
import { shuffle } from "../helpers";

class WorkoutStatistics extends Component {
  state = {
    lastWeight: this.props.lastWeight,
    weightChanged: false,
    statOrder: []
  };
  componentDidMount() {
    this.calcStats();
    this.setState({
      statOrder: shuffle(Array.from(Array(this.statistics.length - 1).keys()))
    });
  }
  componentDidUpdate() {
    console.log(this.state.lastWeight);
    console.log("update");
    this.calcStats();
  }
  calcStats() {
    this.statistics = [
      <Statistic value={this.calcWorkoutsPerWeek()} label="workouts/week" />,
      <Statistic
        value={this.props.userHistory.lastWorkouts.length}
        label="workouts done"
      />,
      <Statistic
        value={(
          this.props.userHistory.totalTrainingTime /
          this.props.userHistory.lastWorkouts.length /
          60
        ).toFixed(2)}
        label="Ø minutes workout time"
      />,
      this.renderWeightStatistics(),
      <Statistic
        value={this.props.differentWorkouts}
        label="different workouts"
      />,
      <Statistic
        value={this.props.differentExercises}
        label="different exercises"
      />,
      <Statistic value={1} label="today's workouts" />,
      <Statistic value={5} label="max workouts/week" />,
      <Statistic value={5} label="max workouts/week" />
    ];
  }
  calcWorkoutsPerWeek() {
    const { lastWorkouts } = this.props.userHistory;
    const startDate = lastWorkouts[0].date;
    const timeMillis = new Date() - startDate;
    const timeWeeks = Math.floor(timeMillis / 1000 / 60 / 60 / 24 / 7);
    const average = lastWorkouts.length / timeWeeks;
    return average.toFixed(2);
  }
  renderWeightStatistics() {
    return (
      <Statistic
        value={this.state.lastWeight}
        label={
          <div>
            <i
              className="arrow alternate circle down icon"
              onClick={() => {
                this.setState({
                  weightChanged: true,
                  lastWeight: parseFloat(
                    (this.state.lastWeight - 0.1).toFixed(1)
                  )
                });
                console.log("click");
              }}
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
            <br />
            {this.state.weightChanged ? (
              <div className="ui icon buttons">
                <div
                  className="ui grey button"
                  onClick={() => {
                    this.setState({ weightChanged: false });
                    this.props.addWeight(this.state.lastWeight);
                  }}
                >
                  <i className="save icon"></i>
                </div>
                <div
                  className="ui red button"
                  onClick={() => {
                    this.setState({
                      weightChanged: false,
                      lastWeight: this.props.lastWeight
                    });
                  }}
                >
                  <i className="x icon"></i>
                </div>
              </div>
            ) : null}
          </div>
        }
      />
    );
  }
  render() {
    console.log(this.state.lastWeight);
    return (
      <div>
        <div className="ui three column grid stat-grid">
          {this.state.statOrder.map(index => {
            return (
              <div className="column" key={index + "" + this.props.value}>
                {this.statistics[index]}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userHistory: state.userData.history,
    lastWeight:
      state.userData.history.weight[state.userData.history.weight.length - 1]
        .weight,
    differentExercises: state.userData.exercises.length,
    differentWorkouts: state.userData.workouts.length
  };
};

export default connect(mapStateToProps, {
  addWeight
})(WorkoutStatistics);
