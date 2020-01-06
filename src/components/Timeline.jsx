import React, { Component } from "react";
import { ProgressIndicator, ProgressStep } from "react-rainbow-components";
import dateFormat from "dateformat";
class Timeline extends Component {
  buildTimeline() {
    let latestTrainingListLength = this.props.latestTrainings.length;
    let currentStepName = "today";
    let today = new Date();
    let todayString = dateFormat(today, "dd.mm.");

    //Nur wenn heute noch kein Training durchgeführt wurde,
    //wird das heutige Datum ohne Hacken angezeigt
    if (
      this.props.latestTrainings[latestTrainingListLength - 1] === todayString
    ) {
      latestTrainingListLength -= 1;
      currentStepName = null;
    }

    return (
      <div className="timeline">
        <ProgressIndicator currentStepName={currentStepName}>
          {this.renderList(latestTrainingListLength)}
          <ProgressStep name="today" label={todayString} />
        </ProgressIndicator>
      </div>
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
