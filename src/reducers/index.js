import { combineReducers } from "redux";
import { shuffle } from "../helpers";
const selectedExerciseReducer = (currentExercise = null, action) => {
  if (action.type === "SET_EXERCISE") {
    return action.payload;
  } else if (action.type === "SELECT_EXERCISE") {
    if (!action.payload.workout || action.payload.workout.length === 0) {
      return currentExercise;
    }
    let index = action.payload.index % action.payload.workout.length;
    return {
      name: action.payload.workout[index].name,
      duration: action.payload.workout[index].duration,
      index: action.payload.index
    };
  }
  return currentExercise;
};

const currentWorkoutReducer = (currentWorkout = [], action) => {
  if (action.type === "CREATE_RANDOM_WORKOUT") {
    //Nehme aus dem gemischten exercisePool eine Anzahl an Übungen
    return {
      title: "Random workout",
      exercises: shuffle([...action.payload.exercisePool]).slice(
        0,
        action.payload.exerciseCount
      )
    };
  } else if (action.type === "SELECT_WORKOUT") {
    return action.payload;
  }
  return currentWorkout;
};

export default combineReducers({
  exercisePool: () => {
    return [
      { name: "Pushup", duration: 3 },
      { name: "Situps", duration: 4 },
      { name: "Squats", duration: 6 },
      { name: "Bent-Over Row", duration: 4 },
      { name: "Abdominal Crunches", duration: 5 }
    ];
  },
  //Exercise: Must have name and duration(int)
  currentExercise: selectedExerciseReducer,
  //Workout: Must have title and exercises([Exercise])
  currentWorkout: currentWorkoutReducer
});
