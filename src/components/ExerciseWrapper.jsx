import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import { pushWorkoutHistory, addTime, setIndex } from "../actions";
import Exercise from "./Exercise.jsx";
import { getWorkout, getExercise } from "../helpers";

class ExerciseWrapper extends Component {
  state = {
    //Sekunden bis Übungsende
    time: 0,
    timer: null
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
      time: this.props.exercise.duration,
      timer: setInterval(() => this.countDown(), 100)
    });
  }

  componentWillUnmount() {
    //Wenn Seite/Component verlassen wird, muss Interval gestoppt werden
    if (this.state.timer) {
      clearInterval(this.state.timer);
    }
  }

  /** Methoden zur Auswahl der Übungen **/

  //Starte die nächste Übung aus aktuellem Workout (this.props.workout)
  next() {
    if (this.props.exercise && !this.state.ready) {
      if (this.props.indexInWorkout + 1 >= this.props.workoutExercises.length) {
        clearInterval(this.state.timer);
        this.props.pushWorkoutHistory(this.props.currentWorkout.id);
        this.setState({ ready: true });
      } else {
        clearInterval(this.state.timer);
        this.props.setIndex(this.props.indexInWorkout + 1);
      }
    }
  }

  /** Timer Methoden **/
  //Zähle jede 1/10 Sekunde runter, wenn auf null, starte nächste Übung
  countDown() {
    //Verringere Timer um 1/10 Sekunde
    this.setState({ time: this.state.time - 0.1 });
    //Füge diese Zeit in die totalWorkoutTime hinzu
    this.props.addTime(0.1);

    //Übung wurde beendet
    if (this.state.time <= 0) {
      console.log("next");
      this.next();
    }
  }

  //Pausiere den Countdown
  pauseTimer() {
    if (this.state.timer) {
      clearInterval(this.state.timer);
      this.setState({ timer: null });
    }
  }

  //Führe den Countdown fort
  runTimer() {
    if (!this.state.timer) {
      this.setState({
        timer: setInterval(() => {
          this.countDown();
        }, 100)
      });
    }
  }

  /** Render **/
  render() {
    if (this.state.ready) {
      //Alle Übungen des aktuellen Workouts wurden beendet
      return (
        <div>
          <h1>WELL DONE!</h1>
          <Link to="/">Home</Link>
          <br />
          <Link to="/overview">Overview on training activitiy</Link>
          <br />
          <div
            onClick={() => {
              this.setState({ ready: false });
              this.props.setIndex(0);
            }}
          >
            Restart Training
          </div>
        </div>
      );
    } else if (
      !this.props.workoutExercises ||
      this.props.workoutExercises.length === 0
    ) {
      console.log("kein wo ausgewählt");
      //Es wurde noch kein Workout ausgewählt=>Auswahlmenu
      return <Redirect to="/workout/-1" />;
    } else if (!this.props.exercise) {
      return <div>Loading Exercise...</div>;
    } else {
      //Die aktuelle Übung wird angezeigt
      return (
        <div>
          <h1>{this.props.workoutTitle}</h1>
          <Exercise exercise={this.props.exercise} time={this.state.time} />
          <div className="ui grid exercise-menu">
            <div className="four wide column">
              <i
                className="step backward icon"
                onClick={() => console.log("backward")}
              ></i>
            </div>
            <div className="four wide column">
              {this.state.timer ? (
                <i className="pause icon" onClick={() => this.pauseTimer()}></i>
              ) : (
                <i className="play icon" onClick={() => this.runTimer()}></i>
              )}
            </div>
            <div className="four wide column">
              <i className="step forward icon" onClick={() => this.next()}></i>
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
    currentWorkout
  };
};

export default connect(mapStateToProps, {
  pushWorkoutHistory,
  addTime,
  setIndex
})(ExerciseWrapper);
