import React, { Component } from "react";
class ExercisePreview extends Component {
  render() {
    if (!this.props.name) {
      return <div></div>;
    }
    return <div>{this.props.name}</div>;
  }
}

export default ExercisePreview;
