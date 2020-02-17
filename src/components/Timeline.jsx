import React, { Component } from "react";
import HorizontalTimeline from "react-horizontal-timeline";
import dateFormat from "dateformat";
import { isToday, isSameDay } from "../helpers";
import { connect } from "react-redux";
class Timeline extends Component {
  state = { index: null };
  today = new Date();
  lastTrainingDates = this.props.lastWorkouts.map(workout => workout.date);
  values = [];
  componentDidMount() {
    this.values = this.getValues();
  }
  buildTimeline() {
    return (
      <div style={{ width: "100%", height: "100px", margin: "0 auto" }}>
        <HorizontalTimeline
          index={
            this.state.index ||
            this.values.length - (this.state.todayNoTraining ? 2 : 1)
          }
          values={this.values}
          indexClick={index => this.setState({ index })}
          getLabel={date => {
            if (date.getYear() === this.today.getYear()) {
              return dateFormat(date, "dd.mm.");
            } else {
              return dateFormat(date, "dd.mm.yy");
            }
          }}
          styles={{ foreground: "darkgreen", outline: "rgb(0,0,139)" }}
          isOpenBeginning={false}
        />
      </div>
    );
  }
  getValues() {
    let dateArray = this.lastTrainingDates.filter((elem, index, arr) => {
      if (index === 0) {
        return true;
      }
      return !isSameDay(arr[index - 1], elem);
    });
    if (!isToday(dateArray[dateArray.length - 1])) {
      if (!this.state.todayNoTraining) {
        this.setState({ todayNoTraining: true });
      }
      dateArray.push(new Date());
    } else if (this.state.todayNoTraining) {
      this.setState({ todayNoTraining: false });
    }
    return dateArray;
  }
  render() {
    return (
      <div>
        {this.buildTimeline()}
        <div className="ui list">
          {this.state.index
            ? this.props.lastWorkouts
                .filter(t => isSameDay(t.date, this.values[this.state.index]))
                .map(t => <div className="item">{t.title}</div>)
            : null}
        </div>
      </div>
    );
  }
}

export default connect(state => {
  return {
    lastWorkouts: state.userData.history.lastWorkouts
  };
})(Timeline);