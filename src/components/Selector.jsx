import React, { Component } from "react";
import CreatableSelect from "react-select/creatable";

class Selector extends Component {
  customStyles = {
    option: provided => ({
      ...provided,
      fontSize: "18px",
      fontWeight: "bold",
      color: "black",
      ...this.props.customStyle.provided
    }),
    control: provided => ({
      fontSize: "18px",
      fontWeight: "bold",
      ...provided,
      ...this.props.customStyle.control
    }),
    singleValue: () => ({
      fontSize: "18px",
      fontWeight: "bold",
      ...this.props.customStyle.singleValue
    })
  };
  render() {
    return (
      <div>
        <CreatableSelect
          styles={this.customStyles}
          options={this.props.options}
          onCreateOption={this.props.onCreate}
          onChange={selected => {
            if (this.props.onChange) {
              this.props.onChange(selected.value);
            }
          }}
          value={this.props.value}
          noOptionsMessage={() =>
            "No options available. Type and Enter to create new!"
          }
        />
      </div>
    );
  }
  static defaultProps = {
    customStyle: {}
  };
}

export default Selector;
