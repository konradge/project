import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import {
  pushWorkoutHistory,
  addTime,
  setIndex,
  setStoppedAt
} from "../actions";
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
      if (this.props.exercise.id === prevProps.exercise.id) {
        console.log("Gleiche");
        //this.props.setStoppedAt(0);
      }
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
      console.log("next");
      if (this.props.indexInWorkout + 1 >= this.props.workoutExercises.length) {
        //Das aktuelle Workout ist beendet->Wird zur History hinzugefügt,
        //fertig machen für nächstes Training(Index auf 0, clearInterval)
        this.props.pushWorkoutHistory(this.props.currentWorkout.id);
        this.props.setIndex(0);
        this.setState({ ready: true });
      } else {
        this.setState({ isRunning: false });
        this.props.setIndex(this.props.indexInWorkout + 1);
      }
    }
  }

  previous() {
    if (this.props.exercise && !this.state.ready) {
      if (this.props.indexInWorkout - 1 >= 0) {
        this.props.setIndex(this.props.indexInWorkout - 1);
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
            running={this.state.isRunning}
            startAt={this.props.exerciseStoppedTime}
            next={() => this.next()}
            edit={() =>
              this.props.history.push("/exercise/" + this.props.exercise.id)
            }
          />
          <div className="exercise-menu">
            <div className="ui grid">
              <div className="three wide column">
                <i
                  className="step backward icon"
                  onClick={() => this.previous()}
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
  return {
    exercise: currentExercise,
    workoutExercises: currentWorkout ? currentWorkout.exercises : null,
    workoutTitle: currentWorkout ? currentWorkout.title : null,
    indexInWorkout: currentIndex,
    currentWorkout,
    exerciseStoppedTime: state.current.workoutStoppedAt
  };
};

export default connect(mapStateToProps, {
  pushWorkoutHistory,
  addTime,
  setIndex,
  setStoppedAt
})(ExerciseWrapper);
