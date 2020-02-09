import React, { Component } from "react";
import Axios from "axios";
import Select from "react-select";
import {
  getLanguages,
  getMuscles,
  getEquipment,
  editExercise,
  addExercise
} from "../actions";
import { connect } from "react-redux";
import { getId } from "../helpers";
import WgerSearchSettings from "./WgerSearchSettings";

class WgerSearch extends Component {
  state = {
    exercises: null,
    searchSettings: { status: 2 },
    shouldReload: false
  };
  componentDidMount() {
    if (this.props.languages.length === 0) {
      this.props.getLanguages();
    }
    if (this.props.muscles.length === 0) {
      this.props.getMuscles();
    }
    if (this.props.equipment.length === 0) {
      this.props.getEquipment();
    }
    this.searchData();
  }
  componentDidUpdate() {
    if (this.state.shouldReload) {
      this.searchData();
      this.setState({ shouldReload: false });
    }
  }
  async searchData(url) {
    this.setState({ exercises: null });
    if (!url) {
      const { searchSettings } = this.state;
      url =
        "http://wger.de/api/v2/exercise.json?" +
        Object.keys(searchSettings)
          .map(key => key + "=" + searchSettings[key])
          .join("&");
    }
    console.log(url);
    const result = await Axios.get(url);
    this.setState({
      exercises: result.data.results,
      next: result.data.next,
      prev: result.data.previous
    });
  }
  renderArrowButtons() {
    return (
      <div className="ui two column grid">
        <div className="right aligned column">
          <button
            className={
              "circular ui icon button" + (this.state.prev ? "" : " disabled")
            }
            onClick={() =>
              this.state.next ? this.searchData(this.state.next) : null
            }
          >
            Previous page
            <i
              className="arrow left icon"
              onClick={() =>
                this.state.prev ? this.searchData(this.state.prev) : null
              }
            ></i>
          </button>
        </div>
        <div className="column">
          <button
            className={
              "circular ui icon button" + (this.state.next ? "" : " disabled")
            }
            onClick={() =>
              this.state.next ? this.searchData(this.state.next) : null
            }
          >
            <i className="arrow right icon"></i>
            Next page
          </button>
        </div>
      </div>
    );
  }
  render() {
    const settingsProps = {
      languages: this.props.languages,
      muscles: this.props.muscles,
      equipment: this.props.equipment,
      setSearchSettings: (key, value) => {
        this.state.searchSettings[key] = value;
        this.setState({
          shouldReload: true
        });
      },
      deleteKey: key => {
        delete this.state.searchSettings[key];
        this.setState({ shouldReload: true });
      }
    };
    if (this.state.exercises === null) {
      return (
        <div>
          <WgerSearchSettings {...settingsProps} />
          Loading...
        </div>
      );
    } else if (this.state.exercises.length === 0) {
      return (
        <div>
          <WgerSearchSettings {...settingsProps} />
          Could not find result... Please change search settings!
        </div>
      );
    }
    return (
      <div>
        <WgerSearchSettings {...settingsProps} />
        <div className="wger-search-results">
          <h1>Results:</h1>
          <div className="ui segment">
            {this.renderArrowButtons()}
            {this.state.exercises.map(ex => (
              <div key={ex.id} className="ui grey inverted segment grid ">
                <div className="five wide column">{ex.name}</div>
                <div className="column">
                  <i
                    className="plus icon"
                    onClick={() => {
                      const idForNewExercise = getId(this.props.exercises);
                      this.props.addExercise("");
                      this.props.editExercise(
                        {
                          name: ex.name,
                          description: ex.description
                        },
                        idForNewExercise
                      );
                      this.props.history.push("/exercise/" + idForNewExercise);
                    }}
                  ></i>
                </div>
              </div>
            ))}
            {this.renderArrowButtons()}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    languages: state.wger.languages,
    muscles: state.wger.muscles,
    equipment: state.wger.equipment,
    exercises: state.userData.exercises
  };
};
export default connect(mapStateToProps, {
  getLanguages,
  getMuscles,
  getEquipment,
  editExercise,
  addExercise
})(WgerSearch);
