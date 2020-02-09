/*
  Formular, um Daten für einzelne Übungen zu setzen/Bearbeiten
*/
import React from "react";
import { Formik, Field } from "formik";

import ImageField from "./ImageSearch/ImageField";

//In einem Formular werden Name, Dauer, Beschreibung und Bild der Übung angezeigt
//Mit dem Button am Ende wird die Übung mit den neuen Werten dann global gespeichert
export default function ExerciseForm(props) {
  const { name, duration, description, image } = props.exercise;
  return (
    <Formik
      onReset={() => alert("hi")}
      enableReinitialize
      initialValues={{
        name,
        duration: duration || props.defaults.exerciseDuration,
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
        } else if (values.duration <= 5) {
          errors.duration = "duration must be at least 6";
        }
        return errors;
      }}
      onSubmit={values => {
        const { name, duration, description, image } = values;
        props.editExercise(
          {
            name,
            duration,
            description,
            image: image.showImage ? image.imageUrl : null
          },
          props.exercise.id
        );
        props.goBack();
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
