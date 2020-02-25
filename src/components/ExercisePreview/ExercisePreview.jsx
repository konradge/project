/*
  Formular zum Bearbeiten der einzelnen Übungen
*/

import React, { Component } from "react";
import { connect } from "react-redux";

import { editExercise, addExercise } from "../../actions";
import { getId } from "../../helpers";
import ExerciseForm from "./ExerciseForm";
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
    if (this.props.match.params.id === "search") {
      ///exercise/search
      return null;
    }
    if (!this.state.exercise && !isNaN(this.props.match.params.id)) {
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
                    this.props.history.push(
                      "/project/exercise/" + idForNewExercise
                    );
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
    //Zeige die Daten der Übung mit Bearbeitungsoption an

    return (
      <ExerciseForm
        exercise={this.state.exercise}
        back={this.props.history.goBack.bind(this)}
      />
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
