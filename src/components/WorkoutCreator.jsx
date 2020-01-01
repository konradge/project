import React, { Component } from "react";
import { connect } from "react-redux";

import { setWorkout, addExercise } from "../actions";
import Selector from "./Selector";
import "../style.css";
import { getWorkout, getExercise } from "../helpers";

class WorkoutCreator extends Component {
  state = {
    selected: null,
    workout: { id: -1, title: "", exercises: [] },
    id: parseInt(this.props.match.params.id)
  };
  componentDidMount() {
    const id = parseInt(this.props.match.params.id);
    this.getWorkout(id);
  }

  componentDidUpdate(prevProps, prevState) {
    const id = parseInt(this.props.match.params.id);
    if (prevState.id !== id) {
      this.getWorkout(id);
    }
  }

  getWorkout(id) {
    let workout = getWorkout(id, this.props.allWorkouts);
    if (!workout) {
      workout = { id: -1, title: "", exercises: [] };
      id = -1;
    }
    this.setState({ workout, id });
  }
  renderExercises() {
    return (
      <div>
        {this.state.workout.exercises.map(exerciseId => {
          const exercise = getExercise(exerciseId, this.props.usersExercises);
          return (
            <div key={exercise.id}>
              {exercise.name + "         "}
              <i
                className="edit icon"
                onClick={() =>
                  this.props.history.push("/exercise/" + exercise.id)
                }
              ></i>
            </div>
          );
        })}
        <Selector
          options={this.props.usersExercises.map(exercise => {
            return { value: exercise.id, label: exercise.name };
          })}
          onChange={selected => this.props.addExercise(selected)}
        />
        {this.state.workout.exercises.length > 0 ? (
          <button
            onClick={() => {
              this.props.setWorkout(this.state.workout.id);
              console.log("set workout to" + this.state.workout.id);
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
    if (!this.state.workout) {
      return <div>Loading...</div>;
    }

    //Behandle nicht existente ID
    return (
      <div>
        <h1>Please select a workout</h1>
        {this.state.workout ? (
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
                value: this.state.workout.id,
                label:
                  this.state.workout.id === -1
                    ? "---Select Workout---"
                    : this.state.workout.title
              }}
            />
            {this.state.workout !== null ? this.renderExercises() : ""}
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    allWorkouts: state.userData.workouts,
    usersWorkouts: state.userData.workouts,
    usersExercises: state.userData.exercises
  };
};

export default connect(mapStateToProps, { setWorkout, addExercise })(
  WorkoutCreator
);
