/*
  Formular, um Daten für einzelne Übungen zu setzen/Bearbeiten
*/
import React, { Component } from "react";
import { Formik, Field } from "formik";

import ImageField from "./ImageSearch/ImageField";
import { connect } from "react-redux";
import {
  editExercise,
  createMuscle,
  deleteMuscle,
  createEquipment,
  deleteEquipment,
  removeExercise
} from "../../actions";
import { Prompt } from "react-router";
import ExerciseFormSelector from "./ExerciseFormSelector";

//In einem Formular werden Name, Dauer, Beschreibung, Muskelpartien und Bild der Übung angezeigt
//Mit dem Button am Ende wird die Übung mit den neuen Werten dann global gespeichert
class ExerciseForm extends Component {
  state = { formChanged: false, exerciseName: "" };
  componentDidMount() {
    window.addEventListener("beforeunload", this.beforeunload.bind(this));
  }
  beforeunload(e) {
    if (this.state.formChanged) {
    }
  }
  componentWillUnmount() {
    this.setState({ formChanged: false });
    window.removeEventListener("beforeunload", this.beforeunload.bind(this));
  }
  render() {
    const {
      name,
      duration,
      description,
      image,
      muscles,
      equipment
    } = this.props.exercise;
    return (
      <div ref={elem => (this.form = elem)}>
        <Prompt
          when={this.state.formChanged}
          message={"There are unsaved changes! Are you sure you want to leave?"}
        />
        <Formik
          validateOnChange
          enableReinitialize
          initialValues={{
            name: name.startsWith("Unnamed exercise") ? "" : name,
            duration: duration || this.props.defaults.exerciseDuration || null,
            description: description || "",
            muscles: (muscles || []).map(muscleId => {
              const name = this.props.muscles.find(
                muscle => muscle.id === muscleId
              );

              return { value: muscleId, label: name };
            }),
            equipment: (equipment || []).map(equipmentId => {
              const name = this.props.equipment.find(
                equipment => equipment.id === equipmentId
              );

              return { value: equipmentId, label: name };
            }),
            image: {
              showImage: image != null,
              imageUrl: image || "",
              alt: name,
              unsplashKeyword: "",
              customUrl: ""
            }
          }}
          validate={values => {
            this.setState({ formChanged: true, exerciseName: values.name });
            const errors = {};
            if (values.name === "") {
              errors.name = "field name required";
            }
            if (values.name.length > 30) {
              errors.name = "Name can only have 30 characters";
            }
            if (!values.duration) {
              errors.duration = "field duration required";
            } else if (values.duration <= 5) {
              errors.duration = "duration must be at least 6";
            }
            return errors;
          }}
          onSubmit={values => {
            this.setState({ formChanged: false });
            const {
              name,
              duration,
              description,
              image,
              muscles,
              equipment
            } = values;
            this.props.editExercise(
              {
                name,
                duration,
                description,
                muscles: (muscles || []).map(m => m.value),
                equipment: (equipment || []).map(e => e.value),
                image: image.showImage ? image.imageUrl : null
              },
              this.props.exercise.id
            );

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
                    autoFocus={values.name === ""}
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
                    autoFocus={values.name !== "" && values.duration <= 5}
                    type="number"
                    min={0}
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
                <ExerciseFormSelector
                  {...this.props}
                  type="muscles"
                  handleChange={handleChange}
                  values={values}
                />
                <ExerciseFormSelector
                  {...this.props}
                  type="equipment"
                  handleChange={handleChange}
                  values={values}
                />
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
                    "ui secondary button " +
                    (errors.name || errors.duration ? "disabled" : null)
                  }
                >
                  Save
                </button>
                <button
                  className="ui button"
                  onClick={evt => {
                    evt.preventDefault();
                    this.props.back();
                  }}
                >
                  Abbort
                </button>
                <button
                  type="button"
                  className="ui red button"
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are your sure that you want to permanently delete this exercise?"
                      )
                    ) {
                      this.setState({ formChanged: false });
                      this.props.removeExercise(this.props.exercise.id);
                      this.props.back();
                    }
                  }}
                >
                  Delete Exercise
                </button>
              </form>
            );
          }}
        </Formik>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    defaults: state.userData.defaultValues,
    muscles: state.userData.muscles,
    equipment: state.userData.equipment
  };
};
export default connect(mapStateToProps, {
  editExercise,
  createMuscle,
  deleteMuscle,
  createEquipment,
  deleteEquipment,
  removeExercise
})(ExerciseForm);
