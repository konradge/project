import React from "react";

import WorkoutStatistics from "../WorkoutStatistics";

export default function FinishScreen(props) {
  return (
    <div>
      <div className="title">
        <div className="heading">WELL DONE!</div>
        <div className="subheading">You have completed your training!</div>
      </div>
      <div className="finish-content">
        <div className="ui two column grid">
          <div className="column finish-stats">
            <WorkoutStatistics />
          </div>
          <div className="column relative-position finish-links">
            <div className="vertical-center">
              <div onClick={props.goToHome}>
                <div>
                  <i className="home icon"></i>Home
                </div>
              </div>
              <div onClick={props.goToOverview}>
                <div>
                  <i className="chart line icon"></i>Overview
                </div>
              </div>
              <div onClick={props.restart}>
                <div>
                  <i className="redo icon"></i>Restart
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

//export default FinishScreen;
