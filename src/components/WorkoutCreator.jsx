import React, { Component } from "react";
import { connect } from "react-redux";

import {
  setWorkout,
  addExercise,
  addWorkout,
  addExerciseToWorkout,
  removeExerciseFromWorkout
} from "../actions";
import Selector from "./Selector";
import "../style.css";
import { getWorkout, getExercise, getId } from "../helpers";

class WorkoutCreator extends Component {
  state = {
    selected: null,
    workout: { id: -1, title: "", exercises: [] },
    id: parseInt(this.props.match.params.id),
    title: null
  };
  componentDidMount() {
    const id = parseInt(this.props.match.params.id);
    const workout = this.getWorkout(id);
    if (id === -1) {
      this.setState({
        workout: { id: -1, title: "", exercises: [] },
        title: "---Select Workout---"
      });
    } else if (workout === null) {
      this.props.history.push("/workout/-1");
    } else {
      this.setState({ workout, id: workout.id, title: workout.title });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const id = parseInt(this.props.match.params.id);
    const workout = this.getWorkout(id);
    if (id === -1 && prevState.workout.id !== -1) {
      console.log("if");
      this.setState({
        workout: { id: -1, title: "", exercises: [] },
        title: "---Select Workout---"
      });
    } else if (workout === null && id !== -1) {
      console.log("else if");
      this.props.history.push("/workout/-1");
    } else if (id !== -1) {
      if (workout.exercises !== prevState.workout.exercises) {
        this.setState({ workout, id: workout.id, title: workout.title });
      }
    }
  }

  getWorkout(id) {
    const workout = getWorkout(id, this.props.allWorkouts);
    if (workout) {
      return workout;
    } else {
      return null;
    }
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
              <i
                className="trash alternate icon"
                onClick={() =>
                  this.props.removeExerciseFromWorkout(
                    exercise.id,
                    this.state.workout.id
                  )
                }
              ></i>
            </div>
          );
        })}
        <Selector
          options={this.props.usersExercises.map(exercise => {
            return { value: exercise.id, label: exercise.name };
          })}
          onChange={selected =>
            this.props.addExerciseToWorkout(selected, this.state.workout.id)
          }
          onCreate={selected => {
            const idForNewExercise = getId(this.props.usersExercises);
            this.props.addExercise(selected);
            this.props.addExerciseToWorkout(
              idForNewExercise,
              this.state.workout.id
            );
            this.props.history.push("/exercise/" + idForNewExercise);
          }}
        />
        {this.state.workout.exercises.length > 0 ? (
          <button
            onClick={() => {
              this.props.setWorkout(this.state.workout.id);
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
              value={{ value: this.state.title, label: this.state.title }}
              onCreate={created => {
                this.props.addWorkout(created);
                this.props.history.push("/workout/3");
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

export default connect(mapStateToProps, {
  setWorkout,
  addExercise,
  addWorkout,
  addExerciseToWorkout,
  removeExerciseFromWorkout
})(WorkoutCreator);
