import React from "react";

const Loader = props => {
  return (
    <div className="ui segment">
      <div className="loading-bar">
        <div className="ui active inverted dimmer">
          <div className="ui text loader">{props.message || "Loading..."}</div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
