import React, { Component } from "react";
import dateFormat from "dateformat";
import Timeline from "./Timeline";
import ChartComponent from "./ChartComponent";
import { connect } from "react-redux";

import { sliceArray } from "../helpers";
class Overview extends Component {
  getLastTrainings(count) {
    console.log(sliceArray(this.props.lastWorkouts, count));
    return sliceArray(this.props.lastWorkouts, count).map(training => {
      if (training.date.getYear() === new Date().getYear()) {
        return dateFormat(training.date, "dd.mm.");
      } else {
        return dateFormat(training.date, "dd.mm.yy");
      }
    });
  }
  getWeightHistory(count) {
    return sliceArray(this.props.weightHistory, count).map(weight => {
      if (weight.date.getYear() === new Date().getYear()) {
        return {
          label: dateFormat(weight.date, "dd.mm."),
          value: weight.weight
        };
      } else {
        return {
          label: dateFormat(weight.date, "dd.mm.yy"),
          value: weight.weight
        };
      }
    });
  }
  render() {
    return (
      <div>
        <Timeline latestTrainings={this.getLastTrainings(5)} />
        <br />
        <ChartComponent values={this.getWeightHistory(5)} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    lastWorkouts: state.userData.history.lastWorkouts,
    weightHistory: state.userData.history.weight
  };
};

export default connect(mapStateToProps)(Overview);
