import React from "react";
import Select from "react-select";
export default props => {
  return (
    <form className="ui form">
      <div className="field">
        <label>Language</label>
        <Select
          isClearable
          options={props.languages.map(lang => {
            return {
              label: (
                <div>
                  <i className={lang.short_name + " flag"}></i>
                  {lang.full_name}
                </div>
              ),
              value: lang.id
            };
          })}
          onChange={evt => {
            if (evt === null) {
              //Sprachauswahl gelöscht
              props.deleteKey("language");
            } else {
              props.setSearchSettings("language", evt.value);
            }
          }}
        />
      </div>
      <div className="field">
        <label>Muscles</label>
        <Select
          isClearable
          options={(props.muscles || []).map(muscle => {
            return {
              label: muscle.name,
              value: muscle.id
            };
          })}
          onChange={evt => {
            if (evt === null) {
              //Muskelauswahl gelöscht
              props.deleteKey("muscles");
            } else {
              props.setSearchSettings("muscles", evt.value);
            }
          }}
        />
      </div>
      <div className="field">
        <label>Equipment</label>
        <Select
          isClearable
          options={props.equipment.map(equipment => {
            return {
              label: equipment.name,
              value: equipment.id
            };
          })}
          onChange={evt => {
            if (evt === null) {
              //Sprachauswahl gelöscht
              props.deleteKey("equipment");
            } else {
              props.setSearchSettings("equipment", evt.value);
            }
          }}
        />
      </div>
      <div className="field">
        <label>Keyword (exact):</label>
        <input
          type="text"
          onKeyDown={evt =>
            evt.keyCode === 13
              ? props.setSearchSettings("name", evt.target.value)
              : null
          }
        />
      </div>
    </form>
  );
};
