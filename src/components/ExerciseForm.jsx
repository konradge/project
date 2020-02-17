/*
  Formular, um Daten für einzelne Übungen zu setzen/Bearbeiten
*/
import React, { Component } from "react";
import { Formik, Field } from "formik";

import ImageField from "./ImageSearch/ImageField";
import CreatableSelect from "react-select/creatable";
import { connect } from "react-redux";
import { editExercise, createMuscle, getMuscles } from "../actions";
import { getId } from "../helpers";

//In einem Formular werden Name, Dauer, Beschreibung, Muskelpartien und Bild der Übung angezeigt
//Mit dem Button am Ende wird die Übung mit den neuen Werten dann global gespeichert
class ExerciseForm extends Component {
  componentDidMount() {
    console.log(this.props.muscles[0]);
    if (this.props.muscles[0].isDefault) {
      this.props.getMuscles();
    }
  }
  render() {
    const { name, duration, description, image, muscles } = this.props.exercise;
    return (
      <Formik
        enableReinitialize
        initialValues={{
          name,
          duration: duration || this.props.defaults.exerciseDuration,
          description: description || "",
          muscles: muscles || [],
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
          } else if (values.duration <= 5) {
            errors.duration = "duration must be at least 6";
          }
          return errors;
        }}
        onSubmit={values => {
          console.log(this.props);
          const { name, duration, description, image, muscles } = values;
          this.props.editExercise(
            {
              name,
              duration,
              description,
              muscles,
              image: image.showImage ? image.imageUrl : null
            },
            this.props.exercise.id
          );
          console.log(this.props);
          this.props.back();
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit
        }) => {
          return (
            <form
              className="ui form"
              onSubmit={handleSubmit}
              onKeyPress={evt => {
                if (evt.which === 13) {
                  evt.preventDefault();
                }
              }}
            >
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
                <label>Muscles:</label>
                <CreatableSelect
                  isMulti
                  onCreateOption={name => {
                    const newId = getId(this.props.muscles);
                    this.props.createMuscle(name);
                    handleChange({
                      target: {
                        value: [
                          ...values.muscles,
                          { value: newId, label: name }
                        ],
                        name: "muscles"
                      }
                    });
                  }}
                  onChange={evt =>
                    handleChange({
                      target: {
                        value: evt,
                        name: "muscles"
                      }
                    })
                  }
                  value={values.muscles}
                  options={this.props.muscles.map(muscle => {
                    return { value: muscle.id, label: muscle.name };
                  })}
                />
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
    defaults: state.userData.defaultValues,
    muscles: state.userData.muscles
  };
};

export default connect(mapStateToProps, {
  editExercise,
  createMuscle,
  getMuscles
})(ExerciseForm);
