import React, { Component } from "react";
import { ProgressIndicator, ProgressStep } from "react-rainbow-components";
class Timeline extends Component {
  state = {
    latestTrainings: ["18.11.", "20.11.", "23.11", "27.11.", "29.11.", "30.11."]
  };
  buildTimeline() {
    let latestTrainingListLength = this.state.latestTrainings.length;
    let currentStepName = "today";
    let today = new Date();
    let todayString = today.getDate() + "." + (today.getMonth() + 1) + ".";

    //For don't rendering todays date two times
    if (
      this.state.latestTrainings[latestTrainingListLength - 1] === todayString
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
    return this.state.latestTrainings.slice(0, length).map((elem, index) => {
      return <ProgressStep key={index} name={"step-" + index} label={elem} />;
    });
  }
  render() {
    return this.buildTimeline();
  }
}

export default Timeline;
