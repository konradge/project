import React, { Component } from "react";
class Statistic extends Component {
  render() {
    return (
      <div className="ui statistic">
        <div className="value">{this.props.value}</div>
        <div className="label">{this.props.label}</div>
      </div>
    );
  }
}

export default Statistic;
