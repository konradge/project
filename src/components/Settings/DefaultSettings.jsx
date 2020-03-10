import React from "react";
function DefaultSettings(props) {
  const setDefaultValue = evt => {
    props.setDefaultValue(evt.target.value, evt.target.name);
  };
  return (
    <div className="section">
      <h1>Defaults</h1>
      <form className="ui form">
        <div className="two fields">
          <div className="field">
            <label>Exercise duration:</label>
            <div className="ui input">
              <input
                name="exerciseDuration"
                type="number"
                value={props.defaultValues.exerciseDuration}
                onChange={evt => setDefaultValue(evt)}
              />
            </div>
          </div>
          <div className="field">
            <label>Pause time:</label>
            <div className="ui input">
              <input
                name="pauseTime"
                type="number"
                value={props.defaultValues.pauseTime}
                onChange={evt => setDefaultValue(evt)}
              ></input>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default DefaultSettings;
