import React, { Component } from "react";
import DeleteSelectorField from "./DeleteSelectorField";
import { deleteAll } from "../../actions";
import { connect } from "react-redux";

class DataDeletor extends Component {
  state = {
    delete: {
      exercises: true,
      workouts: true,
      muscles: true,
      equipment: true,
      history: {
        workouts: true,
        weight: true,
        "training time": true
      }
    }
  };
  deleteAll(evt) {
    evt.preventDefault();
    if (
      window.confirm("Are your sure that you want to delete all of your data?")
    ) {
      this.props.deleteAll(this.state.delete);
    }
  }
  render() {
    return (
      <div className="subsection">
        <h2>Delete data:</h2>
        <form className="ui form">
          <div className="grouped fields">
            <DeleteSelectorField
              setState={this.setState.bind(this)}
              label={"Exercises"}
              values={this.state.delete}
            />
            <DeleteSelectorField
              setState={this.setState.bind(this)}
              label={"Workouts"}
              values={this.state.delete}
            />
            <DeleteSelectorField
              setState={this.setState.bind(this)}
              label={"Muscles"}
              values={this.state.delete}
            />
            <DeleteSelectorField
              setState={this.setState.bind(this)}
              label={"Equipment"}
              values={this.state.delete}
            />
          </div>
          <div className="framed">
            <div className="grouped fields">
              <div className="ui toggle checkbox">
                <input
                  type="checkbox"
                  checked={
                    this.state.delete.history.workouts &&
                    this.state.delete.history.weight &&
                    this.state.delete.history["training time"]
                  }
                  onChange={evt =>
                    this.setState({
                      delete: {
                        ...this.state.delete,
                        history: {
                          workouts: evt.target.checked,
                          weight: evt.target.checked,
                          "training time": evt.target.checked
                        }
                      }
                    })
                  }
                ></input>
                <label>History:</label>
              </div>
              <div className="grouped field">
                <DeleteSelectorField
                  historyField
                  setState={this.setState.bind(this)}
                  label={"Weight"}
                  values={this.state.delete}
                />
                <DeleteSelectorField
                  historyField
                  setState={this.setState.bind(this)}
                  label={"Workouts"}
                  values={this.state.delete}
                />
                <DeleteSelectorField
                  historyField
                  setState={this.setState.bind(this)}
                  label={"Training Time"}
                  values={this.state.delete}
                />
              </div>
            </div>
          </div>
        </form>
        <button
          type="button"
          className="ui red button"
          onClick={this.deleteAll.bind(this)}
        >
          Delete
        </button>
      </div>
    );
  }
}

export default connect(null, { deleteAll })(DataDeletor);
