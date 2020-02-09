import { createStore } from "redux";
import throttle from "lodash.throttle";
import thunk from "redux-thunk";
import Speech from "speak-tts";

import { saveState, loadState } from "./localstorage";
import reducers from "./reducers";
import { applyMiddleware } from "redux";

export function formatTime(seconds) {
  let hours = Math.floor(seconds / (60 * 60));
  let mins = Math.floor((seconds % (60 * 60)) / 60);
  let secs = Math.floor(seconds % 60);
  return (
    (hours === 0 ? "" : hours + ":") +
    (mins < 10 ? "0" + mins : mins) +
    ":" +
    (secs < 10 ? "0" + secs : secs)
  );
}

//For copy call shuffle([...array])
export function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

export function findById(array, id) {
  return array.find(elem => elem.id === id);
}

//Calculates an array, which has max length of maxLength
export function sliceArray(arr, maxLength) {
  return arr.slice(
    Math.sign(arr.length - maxLength) === -1 ? 0 : arr.length - maxLength
  );
}

export function isSameDay(date1, date2) {
  console.log(date1);
  console.log(date2);
  console.log("----------");
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getYear() === date2.getYear()
  );
}

export function getWorkout(id, workoutList) {
  return workoutList.find(workout => workout.id === id);
}

export function getExercise(id, exerciseList) {
  return exerciseList.find(exercise => exercise.id === id);
}

//Gib die nächste freie ID aus einer Liste zurück
export function getId(list) {
  const sortedIds = list.map(item => item.id).sort((a, b) => a - b);
  if (sortedIds.length === 0) {
    return 0;
  }
  return sortedIds[sortedIds.length - 1] + 1;
}

export function isToday(date) {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

export function prepareStore() {
  let persistedState = loadState();
  if (persistedState) {
    persistedState = persistedState.state;
    console.log(persistedState);
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
//die Daten hier wieder in Daten verwandelt werden.
export function prepareDateInHistory(persistedState) {
  console.log(persistedState);
  let { lastWorkouts, weight } = persistedState;
  for (let key in lastWorkouts) {
    lastWorkouts[key].date = new Date(lastWorkouts[key].date);
  }
  for (let key in weight) {
    weight[key].date = new Date(weight[key].date);
  }
}

export function tts(text) {
  if ("speechSynthesis" in window) {
    const synthesis = window.speechSynthesis;

    // Get the first `en` language voice in the list
    const voice = synthesis.getVoices().filter(function(voice) {
      return voice.lang === "en";
    })[0];

    // Create an utterance object
    let utterance = new SpeechSynthesisUtterance(text);

    // Set utterance properties
    utterance.voice = voice;
    utterance.pitch = 1.5;
    utterance.rate = 1.25;
    utterance.volume = 0.8;

    // Speak the utterance
    synthesis.speak(utterance);
  } else {
    console.log("Text-to-speech not supported.");
  }
}
