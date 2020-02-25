import React, { Component } from "react";
import ExerciseSearch from "./ExerciseSearch";

class InternalSearch extends Component {
  render() {
    return (
      <div>
        <h1>Search for exercises</h1>
        <ExerciseSearch history={this.props.history} />
      </div>
    );
  }
}

export default InternalSearch;
