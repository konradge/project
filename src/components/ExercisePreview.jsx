import React, { Component } from "react";
import { connect } from "react-redux";

import { editExercise } from "../actions";
import UnsplashSearch from "./UnsplashSearch";
import { TextArea } from "semantic-ui-react";
class ExercisePreview extends Component {
  constructor(props) {
    super(props);
    const id = parseInt(this.props.match.params.id);
    const exercise = this.props.exercises.find(ex => ex.id === id);
    console.log(exercise);
    this.state = {
      id: id,
      exercise: exercise,
      exerciseName: exercise.name,
      exerciseDuration: exercise.duration,
      exerciseImage: exercise.image,
      exerciseDescription: exercise.description || "",
      imageURL: "",
      unsplashKeyword: "",
      showImage: false
    };
  }
  renderImage() {
    if (this.state.exerciseImage) {
      return (
        <img
          src={this.state.exerciseImage}
          alt={"Image of " + this.state.exerciseName}
          width="20%"
        />
      );
    } else {
      return (
        <div className="ui placeholder segment">
          <div className="ui two column very relaxed stackable grid">
            <div className="column">
              <label htmlFor="urlInput">Provide image's URL:</label>
              <input
                id="urlInput"
                value={this.state.imageURL}
                onChange={event =>
                  this.setState({ imageURL: event.target.value })
                }
                onKeyDown={e => {
                  if (e.key === "Enter") {
                    this.setState({
                      exerciseImage: this.state.imageURL
                    });
                  }
                }}
              ></input>
            </div>
            <div className="middle aligned column">
              <label htmlFor="unsplashInput">Search in unsplash.com</label>
              <input
                id="unsplashInput"
                onChange={event =>
                  this.setState({ unsplashKeyword: event.target.value })
                }
              ></input>
            </div>
          </div>
          <div className="ui vertical divider">Or</div>
        </div>
      );
    }
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
        <label htmlFor="description">Description:</label>
        <TextArea
          id="description"
          value={this.state.exerciseDescription}
          onChange={evt =>
            this.setState({ exerciseDescription: evt.target.value })
          }
        ></TextArea>
        {this.renderImage()}
        {this.state.unsplashKeyword ? (
          <UnsplashSearch
            keyword={this.state.unsplashKeyword}
            setImage={image =>
              this.setState({
                exerciseImage: image.imageURL,
                unsplashKeyword: null
              })
            }
          />
        ) : null}
        <button
          onClick={() => {
            this.props.editExercise(
              {
                name: this.state.exerciseName,
                duration: this.state.exerciseDuration,
                image: this.state.exerciseImage,
                description: this.state.exerciseDescription
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
