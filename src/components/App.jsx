import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import "../style.css";

import ExerciseWrapper from "./ExerciseWrapper/ExerciseWrapper";
import Menu from "./Menu";
import Overview from "./Overview/Overview";
import Main from "./Main";
import WorkoutCreator from "./WorkoutCreator/WorkoutCreator";
import ExercisePreview from "./ExercisePreview/ExercisePreview";
import Settings from "./Settings/Settings";
import WgerSearch from "./ExerciseSearch/WgerSearch";
import InternalSearch from "./ExerciseSearch/InternalSearch";
import { loadDefaultData } from "../actions";
import { connect } from "react-redux";
class App extends Component {
  componentDidMount() {
    //Lade, falls nötig, die Standarddaten aus JSON-Dateien und wger-Datenbank
    if (this.props.muscles.length === 0) {
      this.props.loadDefaultData();
    }
  }
  render() {
    return (
      <BrowserRouter>
        <Route path="/(be-fit)?" component={Menu} />
        <div className="content">
          <Route path="(/be-fit)?/overview" component={Overview} />
          <Route path="(/be-fit)?/workout" component={ExerciseWrapper} exact />
          <Route path="(/be-fit)?/workout/:id" component={WorkoutCreator} />
          <Route path="(/be-fit)?/exercise/:id" component={ExercisePreview} />
          <Route path="(/be-fit)?/exercise/search" component={InternalSearch} />
          <Route path="(/be-fit)?/settings" component={Settings} />
          <Route path="(/be-fit)?/wger" component={WgerSearch} />
          <Route path="(/be-fit)?/" component={Main} exact />
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(
  state => {
    return {
      muscles: state.wger.muscles,
      exercise: state.userData.exercises[0]
    };
  },
  { loadDefaultData }
)(App);
