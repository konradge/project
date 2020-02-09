import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { Provider } from "react-redux";
import { prepareStore } from "./helpers";

ReactDOM.render(
  <Provider store={prepareStore()}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
