import React, { Component } from "react";
import CreatableSelect from "react-select/creatable";

import "../style.css";

class Selector extends Component {
  render() {
    return (
      <div>
        <CreatableSelect
          options={this.props.options}
          onCreateOption={this.props.onCreate}
          onChange={selected => {
            if (this.props.onChange) {
              this.props.onChange(selected.value);
            }
          }}
          defaultValue={this.props.defaultValue}
        />
      </div>
    );
  }
}

export default Selector;
