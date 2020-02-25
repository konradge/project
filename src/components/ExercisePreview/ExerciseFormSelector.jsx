import React from "react";
import { getId } from "../../helpers";
import Selector from "../Selector";
const ExerciseFormSelector = props => {
  //props.type either "muscles" or "equipment"
  const create = {
    muscles: props.createMuscle,
    equipment: props.createEquipment
  };
  const remove = {
    muscles: props.deleteMuscle,
    equipment: props.deleteEquipment
  };
  return (
    <div className="field">
      <label>{props.type}:</label>
      <Selector
        isMulti
        onCreate={name => {
          const newId = getId(props[props.type]);
          create[props.type](name);
          props.handleChange({
            target: {
              value: [
                ...props.values[props.type],
                { value: newId, label: name }
              ],
              name: props.type
            }
          });
        }}
        onChange={evt => {
          props.handleChange({
            target: {
              value: evt,
              name: props.type
            }
          });
        }}
        value={(props.values[props.type] || []).map(elem => {
          let data = props[props.type].find(e => e.id === elem.value);
          //Falls Muskulatur oder Equipment noch nicht geladen hat, setze jeweilige Namen auf leeren String
          let label = "";
          if (data) {
            label = data.name;
          }

          return {
            value: elem.value,
            label: label
          };
        })}
        options={(props[props.type] || []).map(elem => {
          return {
            value: elem.id,
            label: (
              <div className="ui grid">
                <div className="twelve wide column">{elem.name}</div>
                <div className="one wide column">
                  <i
                    onClick={evt => {
                      evt.stopPropagation();
                      remove[props.type](elem.id);
                    }}
                    className="trash alternate icon"
                  ></i>
                </div>
              </div>
            )
          };
        })}
      />
    </div>
  );
};

export default ExerciseFormSelector;
