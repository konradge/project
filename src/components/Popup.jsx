import React, { Component } from "react";
import { Popup as SemanticPopup } from "semantic-ui-react";

class Popup extends Component {
  state = { open: false };
  setOpen(open) {
    if (this.props.canOpen) {
      this.setState({ open });
    }
  }
  render() {
    return (
      <SemanticPopup
        content={this.props.content}
        eventsEnabled={true}
        on="click"
        onClose={() => {
          this.setOpen(false);
        }}
        onOpen={() => {
          this.setOpen(true);
        }}
        open={this.state.open}
        trigger={this.props.trigger}
      />
    );
  }
  static defaultProps = {
    canOpen: true
  };
}

export default Popup;
