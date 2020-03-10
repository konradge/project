import React from "react";
const DeleteSelectorField = props => {
  return (
    <div className="field">
      <div className="ui toggle checkbox">
        <input
          type="checkbox"
          checked={
            props.historyField
              ? props.values.history[props.label.toLowerCase()]
              : props.values[props.label.toLowerCase()]
          }
          onChange={evt => {
            if (props.historyField) {
              props.setState({
                delete: {
                  ...props.values,
                  history: {
                    ...props.values.history,
                    [props.label.toLowerCase()]: evt.target.checked
                  }
                }
              });
            } else {
              props.setState({
                delete: {
                  ...props.values,
                  [props.label.toLowerCase()]: evt.target.checked
                }
              });
            }
          }}
        />
        <label>{props.label}</label>
      </div>
    </div>
  );
};

export default DeleteSelectorField;
