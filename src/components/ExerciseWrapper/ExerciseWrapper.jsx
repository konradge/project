import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Speech from "speak-tts";

import {
  pushWorkoutHistory,
  addTime,
  setIndex,
  setStoppedAt,
  setPause
} from "../../actions";
import { findById } from "../../helpers";
import FinishScreen from "./FinishScreen";
import ExerciseScreen from "./ExerciseScreen";
import { Loader } from "../Loader";

class ExerciseWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isRunning: true,
      pause: false
    };
  }

  /** Lifecycle Methods **/
  async componentDidMount() {
    const speech = new Speech();
    await speech.init({ lang: "en-GB" });

    this.setState({ speech });
    if (this.props.workoutExercises && this.props.exercise) {
      this.startExercise();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.indexInWorkout !== prevProps.indexInWorkout) {
      if (this.props.exercise.id === prevProps.exercise.id) {
        this.props.setStoppedAt(0);
      }
      this.startExercise();
    }
  }

  startExercise() {
    this.setState({
      isRunning: true
    });
  }

  speak(text) {
    if (this.state.speech) {
      this.state.speech.speak({ text: text });
    }
  }

  /** Methoden zur Auswahl der Übungen **/

  //Starte die nächste Übung aus aktuellem Workout (this.props.workout)
  next() {
    if (this.props.pause !== null) {
      this.props.setPause(null);
      this.speak(
        this.props.exercise.duration + " seconds " + this.props.exercise.name
      );

      return;
    }
    if (this.props.exercise && !this.state.ready) {
      if (this.props.indexInWorkout + 1 >= this.props.workoutExercises.length) {
        //Das aktuelle Workout ist beendet->Wird zur History hinzugefügt,
        //fertig machen für nächstes Training(Index auf 0, clearInterval)
        this.props.pushWorkoutHistory(this.props.currentWorkout.title);
        this.props.setIndex(0);
        this.setState({ ready: true });
        this.speak("Well done. workout completed!");
      } else {
        if (!this.props.pause) {
          //tts("pause starts now");
          const nextExerciseIndex = this.props.currentWorkout.exercises[
            this.props.indexInWorkout + 1
          ].id;
          const nextExercise = findById(
            this.props.exerciseList,
            nextExerciseIndex
          );

          this.speak(
            this.props.pauseTime +
              " seconds pause. prepare for " +
              nextExercise.name
          );
          console.log("next");
          this.props.setIndex(this.props.indexInWorkout + 1);
          this.props.setPause(this.props.pauseTime);
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
          goToHome={() => this.props.history.push("/project/")}
          goToOverview={() => this.props.history.push("/project/overview")}
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
      return <Loader />;
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
  const currentWorkout = findById(
    state.userData.workouts,
    state.current.workout
  );

  const currentIndex = state.current.index;
  console.log(currentWorkout.exercises);
  console.log(currentIndex);
  const currentExercise = currentWorkout
    ? findById(
        state.userData.exercises,
        currentWorkout.exercises[currentIndex].id
      )
    : null;
  let exercise = { ...currentExercise };

  if (currentWorkout.exercises[currentIndex].duration) {
    //Eigene Zeit wurde angegeben
    exercise.duration = parseInt(
      currentWorkout.exercises[currentIndex].duration
    );
  }
  return {
    exercise,
    workoutExercises: currentWorkout ? currentWorkout.exercises : null,
    workoutTitle: currentWorkout ? currentWorkout.title : null,
    indexInWorkout: currentIndex,
    currentWorkout,
    exerciseStoppedTime: state.current.workoutStoppedAt,
    pause: state.current.pause,
    pauseTime: currentWorkout
      ? currentWorkout.pauseTime
      : state.userData.defaultValues.pauseTime,
    exerciseList: state.userData.exercises
  };
};
export default connect(mapStateToProps, {
  pushWorkoutHistory,
  addTime,
  setIndex,
  setStoppedAt,
  setPause
})(ExerciseWrapper);
