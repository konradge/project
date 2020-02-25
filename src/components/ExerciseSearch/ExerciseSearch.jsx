import React, { Component } from "react";
import { editExercise, addExercise } from "../../actions";
import { connect } from "react-redux";
import { getId } from "../../helpers";
import SearchSettings from "./SearchSettings";
import Axios from "axios";
import { Loader } from "../Loader";

class WgerSearch extends Component {
  state = {
    exercises: null,
    //status:2 -> Nur "verifizierte" Übungen
    searchSettings: { status: 2 },
    shouldReload: false
  };
  componentDidMount() {
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
    const { searchSettings } = this.state;
    if (this.props.wgerSearch) {
      if (!url) {
        url =
          "https://wger.de/api/v2/exercise.json?" +
          Object.keys(searchSettings)
            .map(key => key + "=" + searchSettings[key])
            .join("&");
      }

      const result = await Axios.get(url);
      this.setState({
        exercises: result.data.results,
        next: result.data.next,
        prev: result.data.previous
      });
    } else {
      this.setState({
        exercises: this.props.exercises.filter(exercise => {
          const isRightEquipment =
            searchSettings.equipment == null ||
            exercise.equipment.includes(searchSettings.equipment);
          const isRightMuscles =
            searchSettings.muscles == null ||
            exercise.muscles.includes(searchSettings.muscles);
          const keywordMatches =
            searchSettings.name == null ||
            exercise.name.includes(searchSettings.name);
          return isRightEquipment && isRightMuscles && keywordMatches;
        })
      });
    }
  }
  renderArrowButtons() {
    if (this.props.wgerSearch) {
      return (
        <div className="ui two column grid">
          <div className="right aligned column">
            <button
              className={
                "circular ui icon button" + (this.state.prev ? "" : " disabled")
              }
              onClick={() =>
                this.state.next ? this.searchData(this.state.prev) : null
              }
            >
              Previous page
              <i className="arrow left icon"></i>
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
    } else {
      return null;
    }
  }
  editIcon = exercise => {
    if (this.props.wgerSearch) {
      return (
        <i
          className="plus icon"
          onClick={() => {
            const idForNewExercise = getId(this.props.exercises);
            this.props.addExercise("");
            this.props.editExercise(
              {
                name: exercise.name,
                description: exercise.description,
                muscles: exercise.muscles,
                equipment: exercise.equipment
              },
              idForNewExercise
            );
            this.props.history.push("/project/exercise/" + idForNewExercise);
          }}
        ></i>
      );
    } else {
      return (
        <i
          className="edit icon"
          onClick={() => {
            this.props.history.push("/project/exercise/" + exercise.id);
          }}
        ></i>
      );
    }
  };
  renderResults() {
    if (this.state.exercises === null) {
      return <Loader />;
    } else if (this.state.exercises.length === 0) {
      return (
        <div className="ui negative message">
          <div className="header">No results found</div>
          <p>Please try with other search settings!</p>
        </div>
      );
    } else {
      return this.state.exercises.map(ex => (
        <div key={ex.id} className="ui grey inverted segment grid ">
          <div className="five wide column">{ex.name}</div>
          <div className="column">{this.editIcon(ex)}</div>
        </div>
      ));
    }
  }
  render() {
    const settingsProps = {
      languages: this.props.languages,
      muscles: this.props.muscles,
      equipment: this.props.equipment,
      setSearchSettings: (key, value) => {
        this.setState({
          shouldReload: true,
          searchSettings: { ...this.state.searchSettings, [key]: value }
        });
      },
      deleteKey: key => {
        delete this.state.searchSettings[key];
        this.setState({ shouldReload: true });
      },
      showLanguages: this.props.showLanguages
    };
    return (
      <div>
        <div className="ui grey inverted raised segment">
          <SearchSettings
            {...settingsProps}
            wgerSearch={this.props.wgerSearch}
          />
        </div>
        <div className="wger-search-results">
          <h1>Results:</h1>
          <div className="ui segment">
            {this.renderArrowButtons()}
            {this.renderResults()}
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
  editExercise,
  addExercise
})(WgerSearch);
