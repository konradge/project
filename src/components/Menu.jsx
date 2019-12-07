import React, { Component } from "react";
import { Link } from "react-router-dom";
class Menu extends Component {
  state = { active: 0 };
  render() {
    let path = this.props.location.pathname;
    return (
      <div className="ui bottom fixed tabular menu">
        <Link className={path === "/" ? "active item" : "item"} to="/">
          Home
        </Link>

        <Link
          className={path === "/overview" ? "active item" : "item"}
          to="/overview"
        >
          Overview
        </Link>

        <Link
          className={path === "/challenges" ? "active item" : "item"}
          to="/challenges"
        >
          Challenges
        </Link>
      </div>
    );
  }
}

export default Menu;
