import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Dropdown, Menu as SemanticMenu } from "semantic-ui-react";
import { connect } from "react-redux";
class Menu extends Component {
  state = { active: 0 };
  render() {
    //const path = this.props.location.pathname;
    const activeItem = this.props.location.pathname;
    return (
      <SemanticMenu secondary vertical>
        <SemanticMenu.Item
          name="Home"
          active={activeItem === "/"}
          onClick={() => this.props.history.push("/")}
        />
        <Dropdown item text="Exercises">
          <Dropdown.Menu>
            {this.props.exercises.map(exercise => (
              <Dropdown.Item
                key={exercise.id}
                active={activeItem === "/exercise/" + exercise.id}
                onClick={() =>
                  this.props.history.push("/exercise/" + exercise.id)
                }
              >
                {exercise.name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown item text="Workouts">
          <Dropdown.Menu>
            {this.props.workouts.map(workout => (
              <Dropdown.Item
                key={workout.id}
                active={activeItem === "/workout/" + workout.id}
                onClick={() =>
                  this.props.history.push("/workout/" + workout.id)
                }
              >
                {workout.title}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown item text="Overview">
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
      </SemanticMenu>
    );
  }
}

const mapStateToProps = state => {
  return {
    exercises: state.userData.exercises,
    workouts: state.userData.workouts
  };
};

export default connect(mapStateToProps)(Menu);
