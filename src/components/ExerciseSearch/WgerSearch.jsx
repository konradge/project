import React, { Component } from "react";
import ExerciseSearch from "./ExerciseSearch";

class WgerSearch extends Component {
  render() {
    return (
      <div>
        <h1>Import exercises from wger.de</h1>
        <ExerciseSearch showLanguages wgerSearch history={this.props.history} />
      </div>
    );
  }
}

export default WgerSearch;
