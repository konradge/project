import React, { Component } from "react";
import Timeline from "./Timeline";
import ChartComponent from "./ChartComponent";
class Overview extends Component {
  state = {};
  render() {
    return (
      <div>
        <Timeline />
        <br />
        <ChartComponent
          values={[
            { label: "20/2019", value: 50 },
            { label: "21/2019", value: 50.5 },
            { label: "22/2019", value: 49.5 }
          ]}
        />
      </div>
    );
  }
}

export default Overview;
