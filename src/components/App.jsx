import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import ExerciseWrapper from "./ExerciseWrapper/ExerciseWrapper";
import Menu from "./Menu";
import Overview from "./Overview";
import Main from "./Main";
import WorkoutCreator from "./WorkoutCreator";
import ExercisePreview from "./ExercisePreview/ExercisePreview";
import Settings from "./Settings";
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
        <Route path="/(project)?" component={Menu} />
        <div className="content">
          <Route path="(/project)?/overview" component={Overview} />
          <Route path="(/project)?/workout" component={ExerciseWrapper} exact />
          <Route path="(/project)?/workout/:id" component={WorkoutCreator} />
          <Route path="(/project)?/exercise/:id" component={ExercisePreview} />
          <Route
            path="(/project)?/exercise/search"
            component={InternalSearch}
          />
          <Route path="(/project)?/settings" component={Settings} />
          <Route path="(/project)?/wger" component={WgerSearch} />
          <Route path="(/project)?/" component={Main} exact />
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(
  state => {
    return { muscles: state.wger.muscles };
  },
  { loadDefaultData }
)(App);
