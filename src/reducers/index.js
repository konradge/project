import { combineReducers } from "redux";
import userDataReducer from "./userDataReducer";
import currentReducer from "./currentReducer";
import wgerReducer from "./wgerReducer";

export default combineReducers({
  //Alles was aktuell ausgewählt ist
  current: currentReducer,
  //Nutzerdaten
  userData: userDataReducer,
  wger: wgerReducer,
  speech: (speech = null, action) => {
    if (action.type === "SET_SPEECH") {
      return action.payload;
    }
    return speech;
  }
});
