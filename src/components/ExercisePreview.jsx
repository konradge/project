/*
  Formular zum Bearbeiten der einzelnen Übungen
*/

import React, { Component } from "react";
import { connect } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";

import { editExercise, addExercise } from "../actions";
import ImageField from "./ImageSearch/ImageField";
import { getId } from "../helpers";
class ExercisePreview extends Component {
  state = { exercise: null };
  componentDidMount() {
    this.getExercise(this.props.match.params.id);
  }
  componentDidUpdate(prevProps, prevState) {
    const id = parseInt(this.props.match.params.id);
    if (prevState.id !== id) {
      this.getExercise(id);
    }
  }

  //Hole Übung mit der ID aus der URL und speichere die ID, gebe sonst undefined zurück
  getExercise(id) {
    const exercise = this.props.exercises.find(ex => ex.id === parseInt(id));
    if (!exercise) {
      return undefined;
    }
    this.setState({
      id,
      exercise
    });
  }
  render() {
    //Falls in der URL eine nicht-existente ID eingegeben wurde, wird dies als Fehler angezeigt
    if (!this.state.exercise) {
      return (
        <div>
          <div className="ui grid">
            <div className="row">
              <div className="ui eight wide centered column red massive label">
                Could not find any exercise!
              </div>
            </div>
            <div className="centered row">
              <div className="ui four wide column">
                <button
                  className="ui button"
                  onClick={() => {
                    this.props.history.goBack();
                  }}
                >
                  <i className="arrow alternate circle left icon"></i>
                  Back
                </button>
              </div>
              <div className="ui four wide column">
                <button
                  className="ui button"
                  onClick={() => {
                    const idForNewExercise = getId(this.props.exercises);
                    this.props.addExercise("");
                    this.props.history.push("/exercise/" + idForNewExercise);
                  }}
                >
                  <i className="plus circle icon"></i>
                  Add Exercise
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
    //In einem Formular werden Name, Dauer, Beschreibung und Bild der Übung angezeigt (siehe ImageWrapper.jsx)
    //Mit dem Button am Ende wird die Übung mit den neuen Werten dann global gespeichert

    const { name, duration, description, image } = this.state.exercise;
    console.log("-----------DEFAULTS");
    console.log(image);
    return (
      <Formik
        enableReinitialize
        initialValues={{
          name,
          duration,
          description: description || "",
          image: {
            showImage: image != null,
            imageUrl: image || "",
            alt: name,
            unsplashKeyword: "",
            customUrl: ""
          }
        }}
        validate={values => {
          const errors = {};
          if (values.name === "") {
            errors.name = "field name required";
          }
          if (!values.duration) {
            errors.duration = "field duration required";
          }
          return errors;
        }}
        onSubmit={values => {
          console.log("----------------Submit------------");
          const { name, duration, description, image } = values;
          console.log(image);
          this.props.editExercise(
            {
              name,
              duration,
              description,
              image: image.showImage ? image.imageUrl : null
            },
            this.state.id
          );
          this.props.history.goBack();
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
          /* and other goodies */
        }) => {
          return (
            <form className="ui form" onSubmit={handleSubmit}>
              <div className="required field">
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Exercise Name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                ></input>
                {errors.name && touched.name && (
                  <div className="form-error">{errors.name}</div>
                )}
              </div>
              <div className="required field">
                <label>Duration (s):</label>
                <input
                  type="number"
                  name="duration"
                  placeholder="Duration in seconds"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.duration}
                ></input>
                {errors.duration && touched.duration && (
                  <div className="form-error">{errors.duration}</div>
                )}
              </div>
              <div className="field">
                <label>Description:</label>
                <textarea
                  name="description"
                  onChange={handleChange}
                  value={values.description}
                ></textarea>
              </div>
              <div className="field">
                <label>Image:</label>
                <Field
                  as={ImageField}
                  onChange={handleChange}
                  name="image"
                  className="image-field"
                />
              </div>
              <button
                type="submit"
                className={
                  "ui button " +
                  (errors.name || errors.duration ? "disabled" : null)
                }
                type="submit"
              >
                Save
              </button>
            </form>
          );
        }}
      </Formik>
    );
  }
}

const mapStateToProps = state => {
  return {
    exercises: state.userData.exercises
  };
};

export default connect(mapStateToProps, { editExercise, addExercise })(
  ExercisePreview
);
