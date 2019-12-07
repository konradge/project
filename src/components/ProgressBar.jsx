import React, { Component } from "react";
class ProgressBar extends Component {
  render() {
    return (
      <div
        className="ui indicating progress"
        data-percent={this.props.percentage + "%"}
      >
        <div className="bar" style={{ width: this.props.percentage + "%" }}>
          <div className="progress">
            {this.props.value ? this.props.value : this.props.percentage + "%"}
          </div>
        </div>
        <div className="label">{this.props.label}</div>
      </div>
    );
  }
}

export default ProgressBar;
