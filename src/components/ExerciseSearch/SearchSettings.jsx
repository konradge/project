import React from "react";
import Select from "react-select";
export default props => {
  return (
    <form className="ui form">
      {props.showLanguages ? (
        <div className="field">
          <label>Language</label>
          <Select
            isClearable
            options={props.languages.map(lang => {
              return {
                label: (
                  <div style={{ color: "black" }}>
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
      ) : null}
      <div className="field">
        <label>Muscles</label>
        <Select
          isClearable
          options={(props.muscles || []).map(muscle => {
            return {
              label: <div style={{ color: "black" }}>{muscle.name}</div>,
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
              label: <div style={{ color: "black" }}>{equipment.name}</div>,
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
        <label>Keyword{props.wgerSearch ? <span> (exact)</span> : null}:</label>
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
