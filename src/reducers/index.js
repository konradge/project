import { combineReducers } from "redux";
import { shuffle } from "../helpers";
const selectedExerciseReducer = (currentExercise = null, action) => {
  switch (action.type) {
    case "SET_EXERCISE":
      return action.payload;
    case "SELECT_EXERCISE":
      if (!action.payload.workout || action.payload.workout.length === 0) {
        return currentExercise;
      }
      let index = action.payload.index % action.payload.workout.length;
      return {
        name: action.payload.workout[index].name,
        duration: action.payload.workout[index].duration,
        index: action.payload.index
      };
    default:
      return currentExercise;
  }
};
const currentWorkoutReducer = (
  currentWorkout = { title: null, exercises: [] },
  action
) => {
  switch (action.type) {
    case "CREATE_RANDOM_WORKOUT":
      //Nehme aus dem gemischten exercisePool eine Anzahl an Übungen
      return {
        title: "Random workout",
        exercises: shuffle([...action.payload.exercisePool]).slice(
          0,
          action.payload.exerciseCount
        )
      };
    case "SELECT_WORKOUT":
      return action.payload;
    case "ADD_EXERCISE":
      let newWorkout = { ...currentWorkout };
      newWorkout.exercises.push(action.payload);

      return newWorkout;
    default:
      return currentWorkout;
  }
};

const defaultExercises = [
  { id: 0, name: "Pushup", duration: 3 },
  { id: 1, name: "Situps", duration: 4 },
  { id: 2, name: "Squats", duration: 6 },
  { id: 3, name: "Bent-Over Row", duration: 4 },
  { id: 4, name: "Abdominal Crunches", duration: 5 }
];

const userDataReducer = (
  userData = {
    workouts: [
      {
        id: 1,
        title: "First Workout",
        exercises: [defaultExercises[0], defaultExercises[1]]
      },
      {
        id: 2,
        title: "Second Workout",
        exercises: [defaultExercises[2], defaultExercises[3]]
      }
    ],
    exercises: defaultExercises
  },
  action
) => {
  switch (action.type) {
    case "SET_USERDATA":
      return userData;
    case "ADD_WORKOUT":
      return userData;
    case "CHANGE_WORKOUT":
      return userData;
    case "GET_WORKOUT":
      return userData;
    default:
      return userData;
  }
};

export default combineReducers({
  //Exercise: Must have name and duration(int)
  currentExercise: selectedExerciseReducer,
  //Workout: Must have title and exercises([Exercise])
  currentWorkout: currentWorkoutReducer,
  //All data changed by the current user
  userData: userDataReducer
});
