//Todo: Veränderung zu einmaligen Trophäen
/*
 Verschiedenen Challenges
*/
import React, { Component } from "react";
import ProgressBar from "./ProgressBar";
import { connect } from "react-redux";
import { isSameDay } from "../helpers";

class Challenges extends Component {
  calcConsecutiveDays(dayArray) {
    let consecutiveDays = 0;
    let i = dayArray.length - 1;
    let day = new Date();
    if (isSameDay(day, dayArray[dayArray.length - 1])) {
      i--;
      consecutiveDays++;
    }
    for (; i >= 0; i--) {
      const testedDay = dayArray[i];
      if (isSameDay(testedDay, day)) {
        //2 Trainings wurden an einem Tag durchgeführt
        continue;
      }
      //Der Vergleichstag wird um eins verringert
      day.setDate(day.getDate() - 1);

      if (isSameDay(testedDay, day)) {
        //testedDay ist tatsächlich einen Tag geringer als der davor
        consecutiveDays++;
      } else {
        return consecutiveDays;
      }
    }
    return consecutiveDays;
  }

  calcConsecutiveDays(arr) {}

  render() {
    const { weightHistory, trainingTime } = this.props;
    const consecutiveDays = Math.min(
      this.calcConsecutiveDays(this.props.lastTrainingDates),
      4
    );
    const totalWorkouts = Math.min(this.props.lastTrainingDates.length, 10);
    const lostWeight =
      Math.max.apply(null, weightHistory) -
      weightHistory[weightHistory.length - 1];
    return (
      <div className="challenges">
        <ProgressBar
          percentage={(consecutiveDays / 4) * 100}
          label="Consecutive days with training"
          value={consecutiveDays + "/4 days"}
        />{" "}
        <ProgressBar
          percentage={(totalWorkouts / 10) * 100}
          label="Total workouts"
          value={totalWorkouts + "/10 trainings"}
        />
        <ProgressBar
          percentage={(lostWeight / 2.5) * 100}
          label="Weight Loss"
          value={lostWeight.toFixed(2) + "/2.5 kg"}
        />
        <ProgressBar
          percentage={(trainingTime / 200) * 100}
          label="Training Time"
          value={trainingTime.toFixed(2) + "/200 min"}
        />
        <ProgressBar
          percentage={(trainingTime / 200) * 100}
          label="Different consecutive trainings"
          value={trainingTime.toFixed(2) + "/200 min"}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    lastTrainingDates: state.userData.history.lastWorkouts.map(
      workout => workout.date
    ),
    lastTrainingIds: state.userData.history.lastWorkouts.map(
      workout => workout.id
    ),
    weightHistory: state.userData.history.weight.map(weight => weight.weight),
    trainingTime: state.userData.history.totalTrainingTime
  };
};

export default connect(mapStateToProps)(Challenges);
