import React, { Component } from "react";
import { connect } from "react-redux";

import { editExercise } from "../actions";
class ExercisePreview extends Component {
  constructor(props) {
    super(props);
    const id = parseInt(this.props.match.params.id);
    const exercise = this.props.exercises.find(ex => ex.id === id);
    this.state = {
      id: id,
      exercise: exercise,
      exerciseName: exercise.name,
      exerciseDuration: exercise.duration
    };
  }
  render() {
    if (!this.state.exercise) {
      return <div>Could not find any exercise!</div>;
    }
    return (
      <div>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          value={this.state.exerciseName}
          onChange={evt => this.setState({ exerciseName: evt.target.value })}
        ></input>
        <label htmlFor="duration">Duration (s):</label>
        <input
          type="number"
          id="duration"
          value={this.state.exerciseDuration}
          onChange={evt =>
            this.setState({ exerciseDuration: evt.target.value })
          }
        ></input>
        <button
          onClick={() => {
            this.props.editExercise(
              {
                name: this.state.exerciseName,
                duration: this.state.exerciseDuration
              },
              this.state.id
            );
            this.props.history.goBack();
          }}
        >
          Save
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    exercises: state.userData.exercises
  };
};

export default connect(mapStateToProps, { editExercise })(ExercisePreview);
