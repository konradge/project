import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import throttle from "lodash.throttle";

import { saveState, loadState } from "./localstorage";
import App from "./components/App";
import reducers from "./reducers";

//let store = createStore(reducers);
let persistedState = loadState();
if (persistedState) {
  persistedState = persistedState.state;
  prepareState(persistedState);
}
const store = createStore(reducers, persistedState);
store.subscribe(() => {
  saveState({
    state: store.getState()
  });
});
store.subscribe(
  throttle(() => {
    saveState({
      state: store.getState()
    });
  }, 1000)
);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);

//Da das Datum im localstorage nicht als Date-Objekt gespeichert werden, müssen
//die Daten hier wieder in Daten verwandelt werden.
function prepareState(persistedState) {
  let { lastWorkouts, weight } = persistedState.userData.history;
  for (let key in lastWorkouts) {
    lastWorkouts[key].date = new Date(lastWorkouts[key].date);
  }
  for (let key in weight) {
    weight[key].date = new Date(weight[key].date);
  }
}
