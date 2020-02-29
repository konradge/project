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
  setStoppedAt,
  setIndex
} from "../actions";
import { getId, unique, findById } from "../helpers";
import "../style.css";
import Selector from "./Selector";
import DragAndDropList from "./DragAndDropList";
import { Loader } from "./Loader";
import { Dropdown } from "./Dropdown";

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
    if (this.props.workout == null) {
      this.props.history.push("/project/workout/-1");
    }
  }

  componentDidUpdate(_, prevState) {
    if (this.props.workout == null && this.props.match.params.id !== "-1") {
      this.props.history.push("/project/workout/-1");
    }
  }

  editExerciseDurationInWorkout(indexInWorkout, duration) {
    let editedExercises = this.props.workout.exercises.map((ex, index) => {
      if (index !== indexInWorkout) {
        return ex;
      } else {
        return { id: ex.id, duration };
      }
    });
    this.props.editWorkout(this.props.workout.id, {
      exercises: editedExercises
    });
  }

  //Zeige dem Nutzer ein Auswahlmenu mit allen gespeicherten Übungen
  //Bei Auswahl wird die ausgewählte Übung zu dem aktuellen Workout und der Liste aller Übungen hinzugefügt
  renderExerciseList() {
    return (
      <div className="field">
        <DragAndDropList
          onDragEnd={ids => {
            //Verändere die Reihenfolge der Übungen
            const newOrder = ids.map(id =>
              this.props.workout.exercises.find(ex => ex.id === id)
            );
            this.props.editWorkout(this.props.workout.id, {
              exercises: newOrder
            });
            this.loadWorkout();
          }}
          items={this.props.workout.exercises
            .map((ex, index) => {
              //Wandle die (als ID) gespeicherte Übung in die richtige Übung um
              const exercise = findById(this.props.usersExercises, ex.id);
              if (exercise) {
                //Zeige diese Übung in einer Tabelle an(Übungsname, Bearbeitungsoption, Löschoption)
                return {
                  content: (
                    <div
                      className="ui secondary inverted raised segment"
                      key={"" + exercise.id + index}
                    >
                      <div className="ui grid">
                        <div className="eight wide column exercise-name">
                          {exercise.name}
                        </div>
                        <div className="four wide column">
                          <div className="ui right labeled mini input">
                            <input
                              type="number"
                              value={
                                ex.duration == null
                                  ? exercise.duration
                                  : ex.duration
                              }
                              onChange={evt =>
                                this.editExerciseDurationInWorkout(
                                  index,
                                  parseInt(evt.target.value)
                                )
                              }
                            ></input>
                            <div className="ui basic label">seconds</div>
                          </div>
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
                                this.props.workout.id
                              )
                            }
                          ></i>
                        </div>
                      </div>
                    </div>
                  ),
                  id: ex.id
                };
              } else {
                return { content: <div></div>, id: -1 };
              }
            })
            .filter(elem => elem !== undefined)}
        />
        {this.renderExerciseSelector()}
      </div>
    );
  }
  renderExerciseSelector() {
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
                        evt.stopPropagation();
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
              this.props.addExerciseToWorkout(selected, this.props.workout.id);
            }
          }}
          onCreate={selected => {
            //Füge die Übung zu allen Übungen und zum aktuellen Workout hinzu
            const idForNewExercise = getId(this.props.usersExercises);
            this.props.addExercise(selected);
            this.props.addExerciseToWorkout(
              idForNewExercise,
              this.props.workout.id
            );
            //Leite weiter zur Bearbeitung der neuen Übung
            this.props.history.push("/project/exercise/" + idForNewExercise);
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
  renderWorkoutSelector() {
    const selectedWorkout = this.props.workout || {
      title: "SELECT WORKOUT OR TYPE TO ADD ONE"
    };
    return (
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
            this.props.history.push("/project/workout/" + selected);
          }
        }}
        value={{
          value: selectedWorkout.title,
          label: selectedWorkout.title
        }}
        onCreate={created => {
          this.props.addWorkout(created);
          this.props.history.push(
            "/workout/" + getId(this.props.usersWorkouts)
          );
        }}
      />
    );
  }
  neededEquipment(type, header) {
    //Type: "equipment" or muscles
    const list = {
      equipment: this.props.usersEquipment,
      muscles: this.props.usersMuscles
    };
    const ids = this.props.workout.exercises.map(ex => {
      const exercise = findById(this.props.usersExercises, ex.id);

      return exercise[type];
    });

    const uniqueIds = unique([].concat.apply([], ids));
    if (uniqueIds.length === 0) {
      return <div>No {header.toLowerCase()}</div>;
    }
    return (
      <Dropdown
        header={header}
        items={uniqueIds.map(id => findById(list[type], id))}
      />
    );
  }
  render() {
    //In componentDidMount() wird nach der ID in der URL das passende Workout ausgeählt,
    //bis dahin soll das Workout nicht angezeigt werden.
    if (this.props.match.params.id === "-1") {
      return this.renderWorkoutSelector();
    }
    if (!this.props.workout) {
      return <Loader />;
    }

    return (
      <div>
        <h1>{this.props.workout.title}</h1>
        <form className="ui form">
          <div className="field">
            {/*Alle bereits gespeicherten Workouts werden im ersten Auswahlmenu aufgelistet
              Bei Auswahl wird der Nutzer auf /workout/id weitergeleitet
            */}
            {this.renderWorkoutSelector()}
          </div>
          {this.props.workout.title !== null ? this.renderExerciseList() : null}
          {this.props.workout.id !== -1 ? (
            <div className="workout-information">
              <div className="ui grid">
                <div className="four wide column">
                  <div className="ui segment">
                    {this.neededEquipment("equipment", "Needed Equipment")}
                  </div>
                </div>
                <div className="four wide column">
                  <div className="ui segment">
                    {this.neededEquipment("muscles", "Strained muscles")}
                  </div>
                </div>
                <div className="column">
                  <div className="ui right labeled input">
                    <div className="ui label">Pause time:</div>
                    <input
                      value={
                        this.props.workout.pauseTime ||
                        this.props.defaultPauseTime
                      }
                      onChange={evt => {
                        this.setState({
                          workout: {
                            ...this.props.workout,
                            pauseTime: evt.target.value
                          }
                        });
                        this.props.editWorkout(this.props.workout.id, {
                          ...this.props.workout,
                          pauseTime: evt.target.value
                        });
                      }}
                    />
                    <div className="ui basic label">sec</div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
          <div>
            {this.props.workout.id !== -1 ? (
              <div>
                <button
                  className={
                    "ui submit button" +
                    (this.props.workout.exercises.length > 0 ? "" : " disabled")
                  }
                  onClick={() => {
                    this.props.setIndex(0);
                    this.props.setWorkout(this.props.workout.id);
                    this.props.history.push("/project/workout");
                  }}
                >
                  Start
                </button>
                <button
                  className="ui red button"
                  onClick={evt => {
                    evt.preventDefault();
                    if (
                      window.confirm(
                        "Are your sure that you want to delete all this workout?"
                      )
                    ) {
                      this.props.removeWorkout(this.props.workout.id);
                    }
                  }}
                >
                  Delete
                </button>
              </div>
            ) : null}
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = parseInt(ownProps.match.params.id);
  const workout = findById(state.userData.workouts, id);
  return {
    userData: state.userData,
    allWorkouts: state.userData.workouts,
    usersWorkouts: state.userData.workouts,
    usersExercises: state.userData.exercises,
    usersEquipment: state.userData.equipment,
    usersMuscles: state.userData.muscles,
    defaultPauseTime: state.userData.defaultValues.pauseTime,
    workout
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
  setStoppedAt,
  setIndex
})(WorkoutCreator);
