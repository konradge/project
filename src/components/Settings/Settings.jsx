import React, { Component } from "react";
import { connect } from "react-redux";
import { setUserData, setDefaultValue, addUserData } from "../../actions";

import FileUpload from "./FileUpload";
import { prepareDateInHistory } from "../../helpers";
import DefaultSettings from "./DefaultSettings";
import DataDownloader from "./DataDownloader";
import DataDeletor from "./DataDeletor";

class Settings extends Component {
  state = {
    overwriteChecked: false
  };
  resetAll(evt) {
    evt.preventDefault();
    if (
      window.confirm("Are your sure that you want to delete all of your data?")
    ) {
      localStorage.clear();
      window.location.reload();
    }
  }
  setUserData(file) {
    //Test, ob Datei valide ist
    try {
      let json = JSON.parse(file);
      const { exercises, workouts, history } = json;
      if (history) {
        prepareDateInHistory(json.history);
      }
      if (
        Array.isArray(exercises) &&
        Array.isArray(workouts) &&
        history &&
        Array.isArray(history.lastWorkouts) &&
        typeof history.totalTrainingTime === "number" &&
        Array.isArray(history.weight)
      ) {
        if (this.state.overwriteChecked) {
          this.props.setUserData(json);
        } else {
          this.props.addUserData(json);
        }
      }
    } catch (error) {
      this.setState({ fileLoadingError: "No valid file provided" });
    }
  }

  render() {
    return (
      <div>
        <DefaultSettings
          defaultValues={this.props.defaultValues}
          setDefaultValue={this.props.setDefaultValue}
        />
        <div className="section">
          <h1>Data</h1>
          <DataDownloader userData={this.props.userData} />
          <div className="subsection">
            <h2>Load saved data from JSON:</h2>
            <form className="ui form">
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
            </form>
          </div>
          <div className="red-section">
            <DataDeletor />
            <div className="subsection reset">
              <button
                type="button"
                className="ui big red button"
                onClick={this.resetAll.bind(this)}
              >
                Full Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userData: state.userData,
    defaultValues: state.userData.defaultValues
  };
};

export default connect(mapStateToProps, {
  setUserData,
  setDefaultValue,
  addUserData
})(Settings);
