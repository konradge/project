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
import { findById, announceExercise } from "../../helpers";
import FinishScreen from "./FinishScreen";
import ExerciseScreen from "./ExerciseScreen";
import Loader from "../Loader";

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
      console.log(this.props.exercise.duration);
      this.speak(
        this.props.exercise.duration -
          (this.props.workoutStoppedAt || 0) +
          " seconds " +
          this.props.exercise.name
      );
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.indexInWorkout !== prevProps.indexInWorkout) {
      if (this.props.exercise.id === prevProps.exercise.id) {
        this.props.setStoppedAt(0);
      }
      this.startExercise();
      if (
        this.props.workoutExercises &&
        this.props.exercise &&
        !this.state.ready &&
        !this.props.pause
      ) {
        this.speak(
          this.props.exercise.duration + " seconds " + this.props.exercise.name
        );
      }
    }
  }

  startExercise() {
    this.setState({
      isRunning: true
    });
  }

  speak(text) {
    if (this.state.speech) {
      this.state.speech.speak({ text: text, queue: false });
    }
  }

  finishWorkout() {
    //Das aktuelle Workout ist beendet->Wird zur History hinzugefügt,
    //fertig machen für nächstes Training(Index auf 0)
    this.props.pushWorkoutHistory(this.props.currentWorkout.title);
    this.props.setIndex(0);
    this.setState({ ready: true });
    this.speak("Well done. workout completed!");
  }

  /** Methoden zur Auswahl der Übungen **/

  //Starte die nächste Übung aus aktuellem Workout (this.props.workout)
  next() {
    if (this.props.pause != null) {
      this.props.setPause(null);
      announceExercise(
        this.props.indexInWorkout,
        this.props.currentWorkout,
        this.props.exerciseList,
        this.state.speech
      );

      return;
    }
    if (this.props.exercise && !this.state.ready) {
      if (this.props.indexInWorkout + 1 >= this.props.workoutExercises.length) {
        this.finishWorkout();
      } else {
        if (!this.props.pause) {
          //Starte Pause, sage nächste Übung an
          if (this.props.pauseTime) {
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
          } else {
            //Pause wurde nicht angegeben oder ist 0, nächste Übung startet dann sofort
            announceExercise(
              this.props.indexInWorkout + 1,
              this.props.currentWorkout,
              this.props.exerciseList,
              this.state.speech
            );
          }
          this.props.setIndex(this.props.indexInWorkout + 1);
          this.props.setPause(this.props.pauseTime);
        }
      }
    }
  }

  //Pausiere den Countdown
  pauseTimer() {
    this.setState({ isRunning: false });
  }

  //Führe den Countdown fort
  runTimer() {
    this.setState({ isRunning: true });
  }

  /** Render **/
  render() {
    if (this.state.ready) {
      //Alle Übungen des aktuellen Workouts wurden beendet
      return (
        <div>
          <FinishScreen
            goToHome={() => this.props.history.push("/be-fit/")}
            goToOverview={() => this.props.history.push("/be-fit/overview")}
            restart={() => {
              this.setState({ ready: false });
              this.props.setIndex(0);
              announceExercise(
                0,
                this.props.currentWorkout,
                this.props.exerciseList,
                this.state.speech
              );
            }}
          />
        </div>
      );
    } else if (
      !this.props.workoutExercises ||
      this.props.workoutExercises.length === 0
    ) {
      //Es wurde noch kein Workout ausgewählt=>Auswahlmenu (WorkoutCreator)
      return <Redirect to="/workout/-1" />;
    } else if (!this.props.exercise) {
      return <Loader />;
    } else {
      //Die aktuelle Übung wird angezeigt
      return (
        <ExerciseScreen
          {...this.props}
          isRunning={this.state.isRunning}
          next={this.next.bind(this)}
          pauseTimer={this.pauseTimer.bind(this)}
          stopWorkout={this.finishWorkout.bind(this)}
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
  //Erhalte aktuelle Übung, ggf. mit anderer Zeit
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
  let nextExercise;
  if (currentWorkout.exercises.length > currentIndex + 1) {
    nextExercise = currentWorkout
      ? {
          ...findById(
            state.userData.exercises,
            currentWorkout.exercises[currentIndex + 1].id
          )
        }
      : null;
    if (currentWorkout.exercises[currentIndex + 1].duration) {
      //Eigene Zeit wurde angegeben
      nextExercise.duration = parseInt(
        currentWorkout.exercises[currentIndex + 1].duration
      );
    }
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
    exerciseList: state.userData.exercises,
    nextExercise,
    workoutStoppedAt: state.current.workoutStoppedAt
  };
};
export default connect(mapStateToProps, {
  pushWorkoutHistory,
  addTime,
  setIndex,
  setStoppedAt,
  setPause
})(ExerciseWrapper);
