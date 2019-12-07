import React, { Component } from "react";
import ProgressBar from "./ProgressBar";
class Challenges extends Component {
  render() {
    return (
      <div>
        <ProgressBar
          percentage={50}
          label="Consecutive days with training"
          value="2/4 days"
        />{" "}
        <ProgressBar
          percentage={70}
          label="Randomly generated trainings"
          value="7/10 trainings"
        />
      </div>
    );
  }
}

export default Challenges;
