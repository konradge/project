import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import { pushWorkoutHistory, addTime, setIndex } from "../actions";
import Exercise from "./Exercise.jsx";
import { getWorkout, getExercise } from "../helpers";
import WorkoutStatistics from "./WorkoutStatistics";

class ExerciseWrapper extends Component {
  state = {
    isRunning: true
  };

  componentDidMount() {
    if (this.props.workoutExercises && this.props.exercise) {
      this.startExercise();
    }
  }

  /** Lifecycle Methods **/
  componentDidUpdate(prevProps) {
    if (this.props.indexInWorkout !== prevProps.indexInWorkout) {
      this.startExercise();
    }
  }

  startExercise() {
    this.setState({
      isRunning: true
    });
  }

  /** Methoden zur Auswahl der Übungen **/

  //Starte die nächste Übung aus aktuellem Workout (this.props.workout)
  next() {
    if (this.props.exercise && !this.state.ready) {
      if (this.props.indexInWorkout + 1 >= this.props.workoutExercises.length) {
        //Das aktuelle Workout ist beendet->Wird zur History hinzugefügt,
        //fertig machen für nächstes Training(Index auf 0, clearInterval)
        this.props.pushWorkoutHistory(this.props.currentWorkout.id);
        this.props.setIndex(0);
        this.setState({ ready: true });
      } else {
        this.props.setIndex(this.props.indexInWorkout + 1);
      }
    }
  }

  /** Pause/Play Methoden **/

  //Pausiere den Countdown
  pauseTimer() {
    console.log("pause");
    this.setState({ isRunning: false });
  }

  //Führe den Countdown fort
  runTimer() {
    this.setState({
      isRunning: true
    });
  }

  /** Render **/
  render() {
    if (this.state.ready) {
      //Alle Übungen des aktuellen Workouts wurden beendet
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
                  <div onClick={() => this.props.history.push("/")}>
                    <div>
                      <i className="home icon"></i>Home
                    </div>
                  </div>
                  <div onClick={() => this.props.history.push("/overview")}>
                    <div>
                      <i className="chart line icon"></i>Overview
                    </div>
                  </div>
                  <div
                    onClick={() => {
                      this.setState({ ready: false });
                      this.props.setIndex(0);
                    }}
                  >
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
    } else if (
      !this.props.workoutExercises ||
      this.props.workoutExercises.length === 0
    ) {
      //Es wurde noch kein Workout ausgewählt=>Auswahlmenu
      return <Redirect to="/workout/-1" />;
    } else if (!this.props.exercise) {
      return <div>Loading Exercise...</div>;
    } else {
      //Die aktuelle Übung wird angezeigt
      return (
        <div>
          <div className="title">
            <div className="heading bottom">{this.props.workoutTitle}</div>
          </div>
          <Exercise
            exercise={this.props.exercise}
            time={this.state.time}
            running={this.state.isRunning}
            next={() => this.next()}
          />
          <div className="exercise-menu">
            <div className="ui grid">
              <div className="three wide column">
                <i
                  className="step backward icon"
                  onClick={() => console.log("backward")}
                ></i>
              </div>
              <div className="three wide column">
                {this.state.isRunning ? (
                  <i
                    className="pause icon"
                    onClick={() => this.pauseTimer()}
                  ></i>
                ) : (
                  <i className="play icon" onClick={() => this.runTimer()}></i>
                )}
              </div>
              <div className="three wide column">
                <i
                  className="step forward icon"
                  onClick={() => this.next()}
                ></i>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  const currentWorkout = getWorkout(
    state.current.workout,
    state.userData.workouts
  );
  const currentIndex = state.current.index;
  const currentExercise = currentWorkout
    ? getExercise(
        currentWorkout.exercises[currentIndex],
        state.userData.exercises
      )
    : null;
  console.log(currentExercise);
  return {
    exercise: currentExercise,
    workoutExercises: currentWorkout ? currentWorkout.exercises : null,
    workoutTitle: currentWorkout ? currentWorkout.title : null,
    indexInWorkout: currentIndex,
    currentWorkout
  };
};

export default connect(mapStateToProps, {
  pushWorkoutHistory,
  addTime,
  setIndex
})(ExerciseWrapper);
