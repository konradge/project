import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import ExerciseWrapper from "./ExerciseWrapper";
import Menu from "./Menu";
import Overview from "./Overview";
import Main from "./Main";
import Challenges from "./Challenges";
import WorkoutCreator from "./WorkoutCreator";
import ExercisePreview from "./ExercisePreview";
class App extends Component {
  state = {};
  render() {
    return (
      <BrowserRouter>
        <Route path="/overview" component={Overview} />
        <Route path="/workout" component={ExerciseWrapper} exact />
        <Route path="/workout/:id" component={WorkoutCreator} />
        <Route path="/exercise/:id" component={ExercisePreview} />
        <Route path="/challenges" component={Challenges} />
        <Route path="/" component={Main} exact />
        {/**Always show menu at bottom of page */}
        <Route path="/" component={Menu} />
      </BrowserRouter>
    );
  }
}

export default App;
