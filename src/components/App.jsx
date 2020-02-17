import React, { Component } from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";

import ExerciseWrapper from "./ExerciseWrapper/ExerciseWrapper";
import Menu from "./Menu";
import Overview from "./Overview";
import Main from "./Main";
import Challenges from "./Challenges";
import WorkoutCreator from "./WorkoutCreator";
import ExercisePreview from "./ExercisePreview";
import Settings from "./Settings";
import WgerSearch from "./WgerSearch";
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route path="/" component={Menu} />
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
          <Route path="/settings" component={Settings} />
          <Route path="/wger" component={WgerSearch} />
          <Route path="/" component={Main} exact />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
