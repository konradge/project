import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import throttle from "lodash.throttle";

import { saveState, loadState } from "./localstorage";
import reducers from "./reducers";

export function announceExercise(index, workout, exerciseList, speech) {
  let exercise = findById(exerciseList, workout.exercises[index].id);
  speech.speak({
    text:
      (workout.exercises[index].duration || exercise.duration) +
      " seconds " +
      exercise.name,
    queue: false
  });
}
//Gibt gemischtes Array <array> zurück
export function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

//Finde erstes Objekt aus <array> mit id <id>
export function findById(array, id) {
  return array.find(elem => elem.id === id);
}

//Teste, ob <date1> und <date2> am gleichen Tag liegen
export function isSameDay(date1, date2) {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getYear() === date2.getYear()
  );
}

//Gib die nächste freie ID aus einer Liste zurück
export function getId(list) {
  const sortedIds = list.map(item => item.id).sort((a, b) => a - b);
  if (sortedIds.length === 0) {
    return 0;
  }
  return sortedIds[sortedIds.length - 1] + 1;
}

//Teste, ob <date> heute ist
export function isToday(date) {
  return isSameDay(date, new Date());
}

//Gebe ein Array zurück, in dem es keine doppelten Werte gibt
export function unique(array) {
  return [...new Set(array)];
}

//TODO
export function prepareStore() {
  let persistedState = loadState();
  if (persistedState) {
    persistedState = persistedState.state;
    prepareDateInHistory(persistedState.userData.history);
  }
  const store = createStore(reducers, persistedState, applyMiddleware(thunk));
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
  return store;
}

//Da das Datum im localstorage nicht als Date-Objekt gespeichert werden, müssen
//die Daten hier wieder in echte Date-Objekte verwandelt werden.
export function prepareDateInHistory(persistedState) {
  let { lastWorkouts, weight } = persistedState;
  for (let key in lastWorkouts) {
    lastWorkouts[key].date = new Date(lastWorkouts[key].date);
  }
  for (let key in weight) {
    weight[key].date = new Date(weight[key].date);
  }
}
