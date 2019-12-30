import { combineReducers } from "redux";
import selectedExerciseReducer from "./selectedExerciseReducer";
import currentWorkoutReducer from "./currentWorkoutReducer";
import userDataReducer from "./userDataReducer";

export default combineReducers({
  //Exercise: Must have name and duration(int)
  currentExercise: selectedExerciseReducer,
  //Workout: Must have title and exercises([Exercise])
  currentWorkout: currentWorkoutReducer,
  //All data changed by the current user
  userData: userDataReducer
});
