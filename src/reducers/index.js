import { combineReducers } from "redux";
import userDataReducer from "./userDataReducer";
import currentReducer from "./currentReducer";
import wgerReducer from "./wgerReducer";

export default combineReducers({
  //Alles was aktuell ausgewählt ist
  current: currentReducer,
  //Nutzerdaten
  userData: userDataReducer,
  //Daten, die für die Wger-Suche (zum Importieren von Übungen) verwendet werden
  wger: wgerReducer
});
