/*
  Zeige verschiedene Statistiken des bisherigen Trainings an
*/
import React, { Component } from "react";
import { connect } from "react-redux";

import { addWeight } from "../actions";
import Statistic from "./Statistic";
import { shuffle, isToday } from "../helpers";

class WorkoutStatistics extends Component {
  state = {
    lastWeight: this.props.lastWeight,
    weightChanged: false,
    statOrder: []
  };
  componentDidMount() {
    //Damit sich die Statistiken nicht bei jeder Veränderung neu mischen,
    //wird dies nur einmalig hier gemacht
    this.calcStats();
    this.setState({
      statOrder: shuffle(Array.from(Array(this.statistics.length).keys()))
    });
  }
  componentDidUpdate() {
    this.calcStats();
  }
  calcStats() {
    //Berechne die Liste der Statistiken, die dann in einer zufälligen Reihenfolge gerendert wird
    const { userHistory, differentExercises, differentWorkouts } = this.props;
    const { lastWorkouts } = userHistory;
    this.statistics = [
      <Statistic value={this.calcWorkoutsPerWeek()} label="workouts/week" />,
      <Statistic
        value={Math.floor(userHistory.totalTrainingTime)}
        label="training minutes"
      />,
      <Statistic value={lastWorkouts.length} label="workouts done" />,
      <Statistic
        value={this.calcAverageWorkoutTime()}
        label="Ø minutes workout time"
      />,
      this.renderWeightStatistics.bind(this),
      <Statistic value={differentWorkouts} label="different workouts" />,
      <Statistic value={differentExercises} label="different exercises" />,
      <Statistic
        value={lastWorkouts.filter(workout => isToday(workout.date)).length}
        label="today's workouts"
      />,
      this.renderWeightLoss.bind(this)
    ];
  }
  calcWorkoutsPerWeek() {
    const { lastWorkouts } = this.props.userHistory;
    if (lastWorkouts.length === 0) {
      //Es wurden noch keine Workouts durchgeführt
      return 0;
    }
    const startDate = lastWorkouts[0].date;
    const timeMillis = new Date() - startDate;
    const timeWeeks = Math.floor(timeMillis / 1000 / 60 / 60 / 24 / 7) + 1;
    const average = lastWorkouts.length / timeWeeks;
    return average.toFixed(2);
  }
  calcAverageWorkoutTime() {
    console.log(this.props.userHistory.lastWorkouts);
    const time = (
      this.props.userHistory.totalTrainingTime /
      this.props.userHistory.lastWorkouts.length
    ).toFixed(2);
    console.log(this.props.userHistory.totalTrainingTime);
    console.log(this.props.userHistory.lastWorkouts.length);
    if (isNaN(time)) {
      //Falls noch keine Workouts durchgeführt wurden
      return 0;
    } else {
      return time;
    }
  }
  renderWeightLoss() {
    let { lastWeight } = this.state;
    if (!this.state.weightChanged) {
      lastWeight = this.props.lastWeight;
    }
    const loss = (
      Math.max.apply(
        null,
        this.props.userHistory.weight.map(w => w.weight)
      ) - lastWeight
    ).toFixed(1);
    return <Statistic value={(loss >= 0 && loss) || 0} label="weight loss" />;
  }
  renderWeightStatistics() {
    let { lastWeight } = this.state;
    if (!this.state.weightChanged) {
      lastWeight = this.props.lastWeight;
    }
    return (
      <Statistic
        value={lastWeight}
        label={
          <div>
            <i
              className="arrow alternate circle down icon"
              onClick={() => {
                this.setState({
                  weightChanged: true,
                  lastWeight: parseFloat((lastWeight - 0.1).toFixed(1))
                });
              }}
            ></i>
            kg weight
            <i
              className="arrow alternate circle up icon"
              onClick={() =>
                this.setState({
                  weightChanged: true,
                  lastWeight: parseFloat((lastWeight + 0.1).toFixed(1))
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
                    this.props.addWeight(lastWeight);
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
    return (
      <div>
        <div className="ui three column grid stat-grid">
          {this.state.statOrder.map(index => {
            //Gehe durch die Reihenfolge der Statistik-Elemente und rendere sie in einer 3*X Tabelle
            if (typeof this.statistics[index] === "function") {
              //Da die Gewichtsstatistik nach Veränderung durch die Pfeile auf den State zugreifen muss,
              //muss dies durch die Funktion renderWeightStatistic() geschehen.
              return (
                <div className="column" key={index}>
                  {this.statistics[index]()}
                </div>
              );
            }
            return (
              <div className="column" key={index}>
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
  let lastWeight = 75;
  if (state.userData.history.weight.length > 0) {
    lastWeight =
      state.userData.history.weight[state.userData.history.weight.length - 1]
        .weight;
  }
  return {
    userHistory: state.userData.history,
    lastWeight,
    differentExercises: state.userData.exercises.length,
    differentWorkouts: state.userData.workouts.length
  };
};

export default connect(mapStateToProps, {
  addWeight
})(WorkoutStatistics);
