import React, { Component } from "react";
import { ProgressIndicator, ProgressStep } from "react-rainbow-components";
class Timeline extends Component {
  buildTimeline() {
    let latestTrainingListLength = this.props.latestTrainings.length;
    let currentStepName = "today";
    let today = new Date();
    let todayString = today.getDate() + "." + (today.getMonth() + 1) + ".";

    //For don't rendering todays date two times
    if (
      this.props.latestTrainings[latestTrainingListLength - 1] === todayString
    ) {
      latestTrainingListLength -= 1;
      currentStepName = null;
    }

    return (
      <ProgressIndicator currentStepName={currentStepName}>
        {this.renderList(latestTrainingListLength)}
        <ProgressStep name="today" label={todayString} />
      </ProgressIndicator>
    );
  }
  renderList(length) {
    return this.props.latestTrainings.slice(0, length).map((elem, index) => {
      return <ProgressStep key={index} name={"step-" + index} label={elem} />;
    });
  }
  render() {
    return this.buildTimeline();
  }
}

export default Timeline;
