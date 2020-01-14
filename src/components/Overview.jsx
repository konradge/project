import React, { Component } from "react";
import dateFormat from "dateformat";
import Timeline from "./Timeline";
import ChartComponent from "./ChartComponent";
import { connect } from "react-redux";

import { sliceArray } from "../helpers";
import { addWeight } from "../actions";
import WorkoutStatistics from "./WorkoutStatistics";
import Challenges from "./Challenges";
import Popup from "./Popup";
class Overview extends Component {
  state = { popupCanOpen: true, weightValue: this.props.lastWeight };
  componentDidMount() {
    this.forceUpdate();
  }
  componentDidUpdate() {
    this.moveToAnchorTag();
  }
  moveToAnchorTag() {
    const selected = this.props.history.location.hash;
    if (selected && selected.length > 0) {
      const elem = document.querySelector(selected);
      elem && elem.scrollIntoView();
    }
  }
  //Die letzen count Trainings werden formatiert und auf die richtige Länge gekürzt
  getLastTrainings(count) {
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
        <div className="overview-section" id="last-trainings">
          <h1>Last Trainings</h1>
          <Timeline latestTrainings={this.getLastTrainings(20)} />
        </div>
        <div className="overview-section" id="body-weight">
          <h1>Body Weight</h1>
          <ChartComponent
            data={{
              title: "weight",
              values: this.getWeightHistory(Number.POSITIVE_INFINITY)
            }}
            backgroundColor="#0ce"
            borderColor="#0df"
          />
          <Popup
            trigger={
              <button
                onClick={() =>
                  this.setState({ popupCanOpen: !this.state.popupCanOpen })
                }
                className="circular ui icon button add-weight"
              >
                <i className="icon plus"></i>
              </button>
            }
            content={
              <div>
                <div className="ui right labeled input">
                  <input
                    type="number"
                    step="0.1"
                    value={this.state.weightValue}
                    onChange={evt =>
                      this.setState({ weightValue: evt.target.value })
                    }
                    placeholder="Enter weight"
                  ></input>
                  <div className="ui basic label">kg</div>
                </div>
                <button
                  onClick={() => {
                    this.props.addWeight(this.state.weightValue);
                    this.setState({ popupCanOpen: false });
                  }}
                >
                  Save
                </button>
              </div>
            }
            canOpen={this.state.popupCanOpen}
          />
        </div>
        <div className="overview-section" id="statistics">
          <h1>Statistics</h1>
          <WorkoutStatistics />
        </div>
        <div className="overview-section" id="challenges">
          <h1>Challenges</h1>
          <Challenges />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    lastWorkouts: state.userData.history.lastWorkouts,
    weightHistory: state.userData.history.weight,
    lastWeight:
      state.userData.history.weight[state.userData.history.weight.length - 1]
        .weight
  };
};

export default connect(mapStateToProps, { addWeight })(Overview);
