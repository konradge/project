import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import { selectExercise, createRandomWorkout } from "../actions";
import Exercise from "./Exercise.jsx";

class ExerciseWrapper extends Component {
  state = {
    //Sekunden bis Übungsende
    time: 0,
    timer: setInterval(() => this.countDown(), 100)
  };

  /** Lifecycle Methods **/
  componentDidMount() {
    this.props.selectExercise(this.props.workout, 0);
  }
  componentDidUpdate(prevProps) {
    if (this.props.exercise === null && this.props.workout) {
      //Workout wurde ausgewählt, dann muss erste(nullte) Übung dieses ausgewählt werden
      this.props.selectExercise(this.props.workout, 0);
    } else if (prevProps !== this.props) {
      //Wurde eine neue Übung ausgewählt(Props aus store wurden verändert),
      //wird die Zeit auf die Übungsgesamtzeit gesetzt
      this.setState({ time: this.props.exercise.duration });
    }
  }

  componentWillUnmount() {
    //Wenn Seite/Component verlassen wird, muss Interval gestoppt werden
    if (this.state.timer) {
      clearInterval(this.state.timer);
    }
  }

  /** Methoden zur Auswahl der Übungen **/
  //Hilfsmethode, um Übung aus Workout zu wählen
  selectExercise(index) {
    this.props.selectExercise(this.props.workout, index);
  }

  //Starte die nächste Übung aus aktuellem Workout (this.props.workout)
  next() {
    if (this.props.exercise) {
      this.selectExercise(this.props.exercise.index + 1);
      //Timer wird direkt um eins verringert
      this.setState({ time: this.state.time + 1 });
      //Alle Übungen des Workouts beendet
      if (this.props.exercise.index === this.props.workout.length) {
        this.setState({ ready: true });
      }
    }
  }

  /** Timer Methoden **/
  //Zähle jede 1/10 Sekunde runter, wenn auf null, starte nächste Übung
  countDown() {
    this.setState({ time: this.state.time - 0.1 });
    if (this.state.time < 0) {
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
              this.selectExercise(0);
            }}
          >
            Restart Training
          </div>
        </div>
      );
    } else if (this.props.workout.length === 0) {
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
  return {
    exercise: state.currentExercise,
    workout: state.currentWorkout.exercises,
    workoutTitle: state.currentWorkout.title,
    exercisePool: state.userData.exercises
  };
};

export default connect(mapStateToProps, {
  selectExercise,
  createRandomWorkout
})(ExerciseWrapper);
