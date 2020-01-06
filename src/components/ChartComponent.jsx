import React from "react";
import { Chart, Dataset } from "react-rainbow-components";

export default class ChartComponent extends React.Component {
  render() {
    return (
      <div className="chart">
        <Chart
          style={{ width: "500px" }}
          labels={this.props.data.values.map(val => val.label)}
          type="line"
          disableAnimations
        >
          <Dataset
            title={this.props.data.title}
            values={this.props.data.values.map(val => val.value)}
            backgroundColor={this.props.backgroundColor}
            borderColor={this.props.borderColor}
          />
        </Chart>
      </div>
    );
  }
  static defaultProps = {
    values: []
  };
}
