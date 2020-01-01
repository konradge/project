import { combineReducers } from "redux";
import userDataReducer from "./userDataReducer";
import currentReducer from "./currentReducer";

export default combineReducers({
  //Alles was aktuell ausgewählt ist
  current: currentReducer,
  //Nutzerdaten
  userData: userDataReducer
});
