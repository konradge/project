/*
  Bearbeitung und Erstellung der Workouts und der jeweiligen Übungen
*/
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  addExercise,
  addExerciseToWorkout,
  addWorkout,
  removeExercise,
  removeExerciseFromWorkout,
  removeWorkout,
  setWorkout,
  editWorkout,
  setStoppedAt
} from "../actions";
import { getExercise, getId, getWorkout } from "../helpers";
import "../style.css";
import Selector from "./Selector";
import DragAndDropList from "./DragAndDropList";

class WorkoutCreator extends Component {
  state = {
    selected: null,
    workout: { id: -1, title: null, exercises: [] },
    id: parseInt(this.props.match.params.id),
    title: null
  };
  componentDidMount() {
    //Finde das in der URL als ID angegebene Workout, falls ID -1 ist, muss ein Workout ausgewählt werden.
    this.loadWorkout();
  }

  loadWorkout() {
    const id = parseInt(this.props.match.params.id);
    const workout = this.getWorkout(id);
    if (id === -1) {
      this.setState({
        workout: { id: -1, title: null, exercises: [] },
        title: "---Select Workout---"
      });
    } else if (workout === null) {
      this.props.history.push("/workout/-1");
    } else {
      this.setState({ workout, id: workout.id, title: workout.title });
    }
  }

  componentDidUpdate(_, prevState) {
    //Wie componentDidMount(), inkl. Verhinderung einer endlosschleife durch setState()
    const id = parseInt(this.props.match.params.id);
    const workout = this.getWorkout(id);
    if (id === -1 && prevState.workout.id !== -1) {
      this.setState({
        workout: { id: -1, title: null, exercises: [] },
        title: "---Select Workout---"
      });
    } else if (workout === null && id !== -1) {
      this.props.history.push("/workout/-1");
    } else if (id !== -1) {
      if (workout.exercises !== prevState.workout.exercises) {
        this.setState({ workout, id: workout.id, title: workout.title });
      }
    }
  }

  //Zeige dem Nutzer ein Auswahlmenu mit allen gespeicherten Übungen
  //Bei Auswahl wird die ausgewählte Übung zu dem aktuellen Workout und der Liste aller Übungen hinzugefügt
  renderExerciseList() {
    return (
      <div className="field">
        <DragAndDropList
          onDragEnd={ids => {
            this.props.editWorkout(this.state.workout.id, { exercises: ids });
            this.loadWorkout();
          }}
          items={this.state.workout.exercises
            .map((exerciseId, index) => {
              //Wandle die (als ID) gespeicherte Übung in die richtige Übung um
              const exercise = getExercise(
                exerciseId,
                this.props.usersExercises
              );
              console.log(exercise);
              if (exercise) {
                //Zeige diese Übung in einer Tabelle an(Übungsname, Bearbeitungsoption, Löschoption)
                return {
                  content: (
                    <div
                      className="ui secondary inverted raised segment"
                      key={"" + exercise.id + index}
                    >
                      <div className="ui grid">
                        <div className="twelve wide column exercise-name">
                          {exercise.name}
                        </div>
                        <div className="one wide column">
                          <i
                            className="large edit icon"
                            onClick={() =>
                              this.props.history.push(
                                "/exercise/" + exercise.id
                              )
                            }
                          ></i>
                        </div>
                        <div className="one wide column">
                          <i
                            className="large trash alternate icon"
                            onClick={() =>
                              this.props.removeExerciseFromWorkout(
                                index,
                                this.state.workout.id
                              )
                            }
                          ></i>
                        </div>
                      </div>
                    </div>
                  ),
                  id: exerciseId
                };
              }
            })
            .filter(elem => elem !== undefined)}
        />
        {this.renderSelector()}
      </div>
    );
  }
  renderSelector() {
    return (
      <div className="ui secondary inverted raised segment">
        <Selector
          options={this.props.usersExercises.map(exercise => {
            return {
              value: exercise.id,
              label: (
                <div className="ui grid">
                  <div className="twelve wide column">{exercise.name}</div>
                  <div className="one wide column">
                    <i
                      className="trash alternate icon"
                      onMouseOver={() => {
                        this.setState({ preventSelect: true });
                      }}
                      onMouseLeave={() => {
                        this.setState({ preventSelect: false });
                      }}
                      onClick={evt => {
                        this.props.removeExercise(exercise.id);
                      }}
                    ></i>
                  </div>
                </div>
              )
            };
          })}
          onChange={selected => {
            //Falls Papierkorb geklickt wurde, wähle Übung nicht aus
            if (!this.state.preventSelect) {
              this.props.addExerciseToWorkout(selected, this.state.workout.id);
            }
          }}
          onCreate={selected => {
            //Füge die Übung zu allen Übungen und zum aktuellen Workout hinzu
            const idForNewExercise = getId(this.props.usersExercises);
            this.props.addExercise(selected);
            this.props.addExerciseToWorkout(
              idForNewExercise,
              this.state.workout.id
            );
            //Leite weiter zur Bearbeitung der neuen Übung
            this.props.history.push("/exercise/" + idForNewExercise);
          }}
          customStyle={{
            control: {
              backgroundColor: "#6F7274",
              border: "#aaa solid 1px"
            }
          }}
        />
      </div>
    );
  }
  render() {
    //In componentDidMount() wird nach der ID in der URL das passende Workout ausgeählt,
    //bis dahin soll das Workout nicht angezeigt werden.
    if (!this.state.workout) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h1>{this.state.workout.title || "Please select workout"}</h1>
        <form className="ui form">
          <div className="field">
            {/*Alle bereits gespeicherten Workouts werden im ersten Auswahlmenu aufgelistet
              Bei Auswahl wird der Nutzer auf /workout/id weitergeleitet
            */}
            <Selector
              options={this.props.usersWorkouts.map(workout => {
                return {
                  value: workout.id,
                  label: (
                    <div className="ui grid">
                      <div className="twelve wide column">{workout.title}</div>
                      <div className="one wide column">
                        <i
                          onClick={() => this.props.removeWorkout(workout.id)}
                          onMouseOver={() => {
                            this.setState({ preventSelect: true });
                          }}
                          onMouseLeave={() => {
                            this.setState({ preventSelect: false });
                          }}
                          className="trash alternate icon"
                        ></i>
                      </div>
                    </div>
                  )
                };
              })}
              onChange={selected => {
                if (!this.state.preventSelect) {
                  this.props.history.push("/workout/" + selected);
                }
              }}
              value={{ value: this.state.title, label: this.state.title }}
              onCreate={created => {
                this.props.addWorkout(created);
                this.props.history.push(
                  "/workout/" + getId(this.props.usersWorkouts)
                );
              }}
            />
          </div>
          {this.state.workout.title !== null ? this.renderExerciseList() : null}
          <button
            className={
              "ui submit button" +
              (this.state.workout.exercises.length > 0 ? "" : " disabled")
            }
            onClick={() => {
              this.props.setWorkout(this.state.workout.id);
              this.props.history.push("/workout");
            }}
          >
            Start
          </button>
        </form>
      </div>
    );
  }

  //Finde das Workout mit ID id aus der Liste aller Workouts
  getWorkout(id) {
    const workout = getWorkout(id, this.props.allWorkouts);
    if (workout) {
      return workout;
    } else {
      return null;
    }
  }
}

const mapStateToProps = state => {
  return {
    userData: state.userData,
    allWorkouts: state.userData.workouts,
    usersWorkouts: state.userData.workouts,
    usersExercises: state.userData.exercises
  };
};

export default connect(mapStateToProps, {
  setWorkout,
  addExercise,
  addWorkout,
  removeWorkout,
  addExerciseToWorkout,
  removeExerciseFromWorkout,
  removeExercise,
  editWorkout,
  setStoppedAt
})(WorkoutCreator);
