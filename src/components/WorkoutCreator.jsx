import React, { Component } from "react";
import { connect } from "react-redux";

import { selectWorkout, addExercise } from "../actions";
import Selector from "./Selector";
import "../style.css";
import ExercisePreview from "./ExercisePreview";
import { findById } from "../helpers";

class WorkoutCreator extends Component {
  state = { selected: null };
  id = parseInt(this.props.match.params.id);
  componentDidMount() {
    const workout = findById(this.props.usersWorkouts, this.id) || null;
    this.props.selectWorkout(workout);
  }
  componentDidUpdate() {
    this.id = parseInt(this.props.match.params.id);
    const workout = findById(this.props.usersWorkouts, this.id) || null;
    this.props.selectWorkout(workout);
  }
  renderExercises() {
    return (
      <div>
        {this.props.currentWorkout.exercises.map(exercise => {
          return <div key={exercise.id}>{exercise.name}</div>;
        })}
        <Selector
          options={this.props.usersExercises.map(exercise => {
            return { value: exercise.id, label: exercise.name };
          })}
          onChange={selected =>
            this.props.addExercise(
              findById(this.props.usersExercises, selected)
            )
          }
        />
        {this.props.currentWorkout.exercises.length > 0 ? (
          <button
            onClick={() => {
              this.props.history.push("/workout");
            }}
          >
            Save
          </button>
        ) : (
          ""
        )}
      </div>
    );
  }
  render() {
    if (this.props.currentWorkout === undefined) {
      return <div>Loading...</div>;
    }
    console.log(this.props.currentWorkout);
    console.log(this.id);
    //Handle non existent id
    return (
      <div>
        <h1>Please select a workout</h1>
        {this.id === -1 || this.props.currentWorkout.title ? (
          <div>
            <Selector
              options={this.props.usersWorkouts.map(workout => {
                return {
                  value: workout.id,
                  label: workout.title
                };
              })}
              onChange={selected =>
                this.props.history.push("/workout/" + selected)
              }
              defaultValue={{
                value: this.id || -1,
                label:
                  this.props.currentWorkout && this.props.currentWorkout.title
                    ? this.props.currentWorkout.title
                    : "--Select Workout--"
              }}
            />
            <ExercisePreview name={this.state.selected} />
            {this.props.currentWorkout !== null ? this.renderExercises() : ""}
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentWorkout: state.currentWorkout,
    usersWorkouts: state.userData.workouts,
    usersExercises: state.userData.exercises
  };
};

export default connect(mapStateToProps, { selectWorkout, addExercise })(
  WorkoutCreator
);
