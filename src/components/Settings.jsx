import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteAll, setUserData, setDefaultValue } from "../actions";

import FileUpload from "./FileUpload";
import { prepareDateInHistory } from "../helpers";

class Settings extends Component {
  state = { overwriteChecked: false };
  deleteAll(evt) {
    evt.preventDefault();
    if (
      window.confirm("Are your sure that you want to delete all of your data?")
    ) {
      this.props.deleteAll();
    }
  }
  saveData() {
    return (
      "text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(this.props.userData))
    );
  }
  setUserData(file) {
    //Test, ob Datei valide ist
    try {
      let json = JSON.parse(file);
      const { exercises, workouts, history } = json;
      if (
        Array.isArray(exercises) &&
        Array.isArray(workouts) &&
        history &&
        Array.isArray(history.lastWorkouts) &&
        typeof history.totalTrainingTime === "number" &&
        Array.isArray(history.weight)
      ) {
        prepareDateInHistory(json.history);
        if (this.state.overwriteChecked) {
          this.props.setUserData(json);
        } else {
          //ADD USER DATA
        }
      }
    } catch (error) {
      this.setState({ fileLoadingError: "No valid file provided" });
    }
  }

  setDefaultValue = evt => {
    this.props.setDefaultValue(evt.target.value, evt.target.name);
  };
  render() {
    return (
      <form className="ui form">
        <div className="ui dividing header">Defaults</div>
        <div className="fields">
          <div className="field">
            <label>Exercise duration</label>
            <input
              name="exerciseDuration"
              type="number"
              value={this.props.defaultValues.exerciseDuration}
              onChange={evt => {
                if (evt.target.value !== "") {
                  this.setDefaultValue(evt);
                }
              }}
            ></input>
          </div>
          <div className="field">
            <label>Pause time:</label>
            <input
              name="pauseTime"
              type="number"
              value={this.props.defaultValues.pauseTime}
              onChange={evt => {
                if (evt.target.value !== "") {
                  this.setDefaultValue(evt);
                }
              }}
            ></input>
          </div>
        </div>
        <div className="ui dividing header">Data</div>
        <div className="field">
          <label>Download all your fitness-data as JSON:</label>
          <a
            className="ui button"
            href={"data:'" + this.saveData()}
            download="fitness-data.json"
            title="Download all of your user-data"
          >
            Download
          </a>
        </div>
        <div className="field">
          <label>Load saved data from JSON:</label>
          <FileUpload
            recievedFile={this.setUserData.bind(this)}
            description="Drag or click here to upload JSON file and load it's content!"
          />
          <div>{this.state.fileLoadingError}</div>
          <div className="field">
            <div className="ui checkbox">
              <input
                type="checkbox"
                checked={this.state.overwriteChecked}
                onChange={() =>
                  this.setState({
                    overwriteChecked: !this.state.overwriteChecked
                  })
                }
              ></input>
              <label>Overwrite old data</label>
            </div>
          </div>
        </div>
        <div className="field">
          <label>Delete all of your data:</label>
          <button
            type="button"
            className="ui red button"
            onClick={this.deleteAll.bind(this)}
          >
            Delete
          </button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    userData: state.userData,
    defaultValues: state.userData.defaultValues
  };
};

export default connect(mapStateToProps, {
  deleteAll,
  setUserData,
  setDefaultValue
})(Settings);
