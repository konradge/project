import React, { Component } from "react";

import { connect } from "react-redux";
import { addWeight } from "../../actions";

import dateFormat from "dateformat";

import Timeline from "./Timeline";
import ChartComponent from "./ChartComponent";
import WorkoutStatistics from "./WorkoutStatistics";
import Popup from "../Popup";

class Overview extends Component {
  state = { weightValue: 0, lastAnchorTag: null };
  componentDidMount() {
    this.setState({ weightValue: this.props.lastWeight });
  }
  componentDidUpdate() {
    this.moveToAnchorTag();
  }
  moveToAnchorTag() {
    //Bewege Website zur jeweils in URL als #anchor am Ende angegebenen Stelle
    const selected = this.props.history.location.hash;
    if (selected !== this.state.lastAnchorTag) {
      this.setState({ lastAnchorTag: selected });
      if (selected && selected.length > 0) {
        const elem = document.querySelector(selected);
        elem && elem.scrollIntoView();
      }
    }
  }
  getWeightHistory() {
    //Formatiere Aufzeichnungen des Körpergewichts
    return this.props.weightHistory.map(weight => {
      if (weight.date.getYear() === new Date().getYear()) {
        return {
          label: dateFormat(weight.date, "dd.mm."),
          value: weight.weight
        };
      } else {
        //Zeige zusätzlich das Jahr an.
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
        <div className="section" id="last-trainings">
          <h1>Last Trainings</h1>
          <Timeline
            latestTrainings={this.props.lastWorkouts.map(training => {
              return training.date;
            })}
          />
        </div>
        <div className="section" id="body-weight">
          <h1>Body Weight</h1>
          <ChartComponent
            data={{
              title: "weight",
              values: this.getWeightHistory()
            }}
            backgroundColor="#0ce"
            borderColor="#0df"
          />
          <Popup
            trigger={
              <button className="circular ui icon button">
                <i className="icon plus"></i>
              </button>
            }
            content={
              <div>
                <div className="ui right labeled input">
                  <input
                    type="number"
                    step="0.1"
                    min={0}
                    value={this.state.weightValue}
                    onChange={evt => {
                      if (evt.target.value >= 0) {
                        this.setState({ weightValue: evt.target.value });
                      }
                    }}
                    onKeyDown={evt => {
                      if (evt.keyCode === 13) {
                        this.props.addWeight(this.state.weightValue);
                      }
                    }}
                    placeholder="Enter weight"
                  ></input>
                  <div className="ui basic label">kg</div>
                </div>
                <button
                  className="ui secondary button"
                  onClick={() => this.props.addWeight(this.state.weightValue)}
                >
                  Save
                </button>
              </div>
            }
          />
        </div>
        <div className="section" id="statistics">
          <h1>Statistics</h1>
          <WorkoutStatistics />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  let lastWeight = 75;
  if (state.userData.history.weight[state.userData.history.weight.length - 1]) {
    lastWeight =
      state.userData.history.weight[state.userData.history.weight.length - 1]
        .weight;
  }
  return {
    lastWorkouts: state.userData.history.lastWorkouts,
    weightHistory: state.userData.history.weight,
    lastWeight
  };
};

export default connect(mapStateToProps, { addWeight })(Overview);
