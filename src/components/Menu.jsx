import React, { Component } from "react";
import { Dropdown, Menu as SemanticMenu } from "semantic-ui-react";
import { connect } from "react-redux";

import { setWorkout, addExercise } from "../actions";
import { getId } from "../helpers";
class Menu extends Component {
  state = { active: 0 };
  render() {
    const activeItem = this.props.location.pathname;
    console.log(activeItem);
    return (
      <div className="top-fixed top-menu">
        <SemanticMenu secondary stackable>
          <SemanticMenu.Item>
            <i className="big heartbeat icon"></i>
          </SemanticMenu.Item>
          <SemanticMenu.Item
            active={activeItem === "/"}
            onClick={() => this.props.history.push("/")}
          >
            <div>
              <i className="home icon"></i>Home
            </div>
          </SemanticMenu.Item>
          <Dropdown
            item
            icon={
              <div>
                <i className="fas fa-dumbbell"></i>Exercises
                <i className="caret down icon"></i>
              </div>
            }
          >
            <Dropdown.Menu>
              {[
                this.props.exercises.map(exercise => (
                  <Dropdown.Item
                    key={exercise.id}
                    active={activeItem === "/exercise/" + exercise.id}
                    onClick={() =>
                      this.props.history.push("/exercise/" + exercise.id)
                    }
                  >
                    {exercise.name}
                  </Dropdown.Item>
                )),
                <Dropdown.Item
                  key={-1}
                  onClick={() => {
                    const idForNewExercise = getId(this.props.exercises);
                    this.props.addExercise("");
                    this.props.history.push("/exercise/" + idForNewExercise);
                  }}
                >
                  <i className="plus icon"></i>Add exercise
                </Dropdown.Item>
              ]}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown
            item
            icon={
              <div>
                <i className="clipboard list icon"></i>Workouts
                <i className="caret down icon"></i>
              </div>
            }
          >
            <Dropdown.Menu>
              {[
                this.props.workouts.map(workout => (
                  <Dropdown.Item
                    key={workout.id}
                    active={activeItem === "/workout/" + workout.id}
                    onClick={() =>
                      this.props.history.push("/workout/" + workout.id)
                    }
                  >
                    {workout.title}
                  </Dropdown.Item>
                )),
                <Dropdown.Item
                  key={-1}
                  onClick={() => {
                    this.props.setWorkout(null);
                    this.props.history.push("/workout/-1");
                  }}
                >
                  <i className="plus icon"></i>Add workout
                </Dropdown.Item>
              ]}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown
            item
            icon={
              <div>
                <i className="chart pie icon"></i>Overview
                <i className="caret down icon"></i>
              </div>
            }
          >
            <Dropdown.Menu>
              <Dropdown.Item
                active={activeItem === "/overview#last-trainings"}
                onClick={() =>
                  this.props.history.push("/overview#last-trainings")
                }
              >
                Last Trainings
              </Dropdown.Item>
              <Dropdown.Item
                active={activeItem === "/overview#body-weight"}
                onClick={() => this.props.history.push("/overview#body-weight")}
              >
                Body Weight
              </Dropdown.Item>
              <Dropdown.Item
                active={activeItem === "/overview#statistics"}
                onClick={() => this.props.history.push("/overview#statistics")}
              >
                Statistics
              </Dropdown.Item>
              <Dropdown.Item
                active={activeItem === "/overview#challenges"}
                onClick={() => this.props.history.push("/overview#challenges")}
              >
                Challenges
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <SemanticMenu.Item
            active={activeItem === "/wger"}
            onClick={() => this.props.history.push("/wger")}
          >
            <div>
              <i className="fas fa-file-import"></i>Import exercises
            </div>
          </SemanticMenu.Item>
          <SemanticMenu.Item
            active={activeItem === "/settings"}
            onClick={() => this.props.history.push("/settings")}
          >
            <div>
              <i className="cogs icon"></i>Settings
            </div>
          </SemanticMenu.Item>
        </SemanticMenu>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state.userData);
  return {
    exercises: state.userData.exercises,
    workouts: state.userData.workouts
  };
};

export default connect(mapStateToProps, { setWorkout, addExercise })(Menu);
