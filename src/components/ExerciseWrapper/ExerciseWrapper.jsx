import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import {
  pushWorkoutHistory,
  addTime,
  setIndex,
  setStoppedAt,
  setPause
} from "../../actions";
import { getWorkout, getExercise, tts } from "../../helpers";
import FinishScreen from "./FinishScreen";
import ExerciseScreen from "./ExerciseScreen";
import PauseScreen from "./PauseScreen";

class ExerciseWrapper extends Component {
  state = {
    isRunning: true,
    pause: false
  };

  /** Lifecycle Methods **/
  async componentDidMount() {
    if (this.props.workoutExercises && this.props.exercise) {
      this.startExercise();
    }
  }

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
    if (this.props.pause !== null) {
      this.props.setPause(null);
      return;
    }
    if (this.props.exercise && !this.state.ready) {
      if (this.props.indexInWorkout + 1 >= this.props.workoutExercises.length) {
        //Das aktuelle Workout ist beendet->Wird zur History hinzugefügt,
        //fertig machen für nächstes Training(Index auf 0, clearInterval)
        this.props.pushWorkoutHistory(
          this.props.currentWorkout.id,
          this.props.currentWorkout.title
        );
        this.props.setIndex(0);
        this.setState({ ready: true });
      } else {
        if (!this.props.pause) {
          tts("pause starts now");
          this.props.setIndex(this.props.indexInWorkout + 1);
          this.props.setPause(400);
        }
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

  //Pausiere den Countdown
  pauseTimer() {
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
        <FinishScreen
          goToHome={() => this.props.history.push("/")}
          goToOverview={() => this.props.history.push("/overview")}
          restart={() => {
            this.setState({ ready: false });
            this.props.setIndex(0);
          }}
        />
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
        <ExerciseScreen
          {...this.props}
          pause={this.props.pause}
          nextExercise={this.props.exercise}
          isRunning={this.state.isRunning}
          next={this.next.bind(this)}
          previous={this.previous.bind(this)}
          pauseTimer={this.pauseTimer.bind(this)}
          runTimer={this.runTimer.bind(this)}
        />
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
    exerciseStoppedTime: state.current.workoutStoppedAt,
    pause: state.current.pause,
    defaultPauseTime: state.userData.defaultValues.pauseTime,
    speech: state.speech
  };
};
export default connect(mapStateToProps, {
  pushWorkoutHistory,
  addTime,
  setIndex,
  setStoppedAt,
  setPause
})(ExerciseWrapper);
