import React, { Component } from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";

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
        <div className="side-menu">
          <Route path="/" component={Menu} />
        </div>
        <div className="content">
          {/*Da die Github Seite als Root /project hat, muss diew auf meine Hauptseite gelenkt werden (/)*/}
          <Route path="/project">
            <Redirect to="/" />
          </Route>
          <Route path="/overview" component={Overview} />
          <Route path="/workout" component={ExerciseWrapper} exact />
          <Route path="/workout/:id" component={WorkoutCreator} />
          <Route path="/exercise/:id" component={ExercisePreview} />
          <Route path="/challenges" component={Challenges} />
          <Route path="/" component={Main} exact />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
