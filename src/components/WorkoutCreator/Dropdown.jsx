import React from "react";
import { Dropdown as SemanticDropdown } from "semantic-ui-react";

const Dropdown = props => {
  return (
    <SemanticDropdown text={props.header}>
      <SemanticDropdown.Menu>
        {props.items.map(item => (
          <SemanticDropdown.Item key={item.id}>
            {item.name}
          </SemanticDropdown.Item>
        ))}
      </SemanticDropdown.Menu>
    </SemanticDropdown>
  );
};

export default Dropdown;
