import React, { Component } from "react";
import { connect } from "react-redux";
import { loadDefaultData } from "../actions";
import { Redirect } from "react-router-dom";
class PrepareGithub extends Component {
  componentDidMount() {
    loadDefaultData();
  }
  render() {
    console.log(this.props.languages);
    if (this.props.gotData) {
      return <Redirect to="/" />;
    }
    return <div>Loading data...</div>;
  }
}

export default connect(
  state => {
    console.log(state.wger.languages.length);
    return { gotData: state.wger.languages.length !== 0 };
  },
  { loadDefaultData }
)(PrepareGithub);
