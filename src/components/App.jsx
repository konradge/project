import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import ExerciseWrapper from "./ExerciseWrapper";
import Menu from "./Menu";
import Overview from "./Overview";
import Main from "./Main";
import Challenges from "./Challenges";
class App extends Component {
  state = {};
  render() {
    return (
      <BrowserRouter>
        <Route path="/overview" component={Overview} />
        <Route path="/workout" component={ExerciseWrapper} />
        <Route path="/challenges" component={Challenges} />
        <Route path="/" component={Main} exact />
        <Route path="/" component={Menu} />
      </BrowserRouter>
    );
  }
}

export default App;
