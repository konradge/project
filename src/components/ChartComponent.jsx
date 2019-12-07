import React from "react";
import { Chart, Dataset } from "react-rainbow-components";

export default class ChartComponent extends React.Component {
  render() {
    return (
      <Chart
        style={{ width: "500px" }}
        labels={this.props.values.map(val => val.label)}
        type="line"
      >
        <Dataset
          title="Weight"
          values={this.props.values.map(val => val.value)}
          backgroundColor="#1de9b6"
          borderColor="#1de9b6"
        />
      </Chart>
    );
  }
  static defaultProps = {
    values: []
  };
}
